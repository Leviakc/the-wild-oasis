import { getToday } from "../utils/helpers";
import { supabase } from "./supabase";
import { subDays } from "date-fns";

export type StatusBooking = "unconfirmed" | "checked-in" | "checked-out";
// | "cancelled";

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: StatusBooking;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins: Cabins;
  guests: Guests;
};

type Cabins = {
  name: string;
};

type Guests = {
  email: string;
  fullName: string;
  nationality: string;
  countryFlag: string;
  nationalID: string;
};

type SupabaseMethods = "eq" | "gt" | "gte" | "lt" | "lte";

export type GetStaysAfterDate = Omit<Booking, "cabins" | "guests"> & {
  guests: {
    fullName: string;
  };
};
export type GetBookingsProps = {
  filter?: {
    field: string;
    value: "all" | "unconfirmed" | "checked-in" | "checked-out";
    method?: SupabaseMethods;
  } | null;
  sortBy: {
    field: "startDate" | "totalPrice";
    direction: "asc" | "desc";
  };
};

export const getBookings = async ({
  filter,
  sortBy,
}: GetBookingsProps): Promise<Booking[]> => {
  let query = supabase
    .from("bookings")
    .select(
      "*, cabins(name), guests(fullName, email, nationality, countryFlag, nationalID )",
    );
  // .eq("status", "unconfirmed").gte("totalPrice", 5000)

  // Filter
  if (filter) {
    // query.eq(filter!.field, filter!.value);
    query = query[filter?.method || "eq"](filter!.field, filter!.value);
  }

  // sortBy
  if (sortBy) {
    query = query.order(sortBy!.field, {
      ascending: sortBy!.direction === "asc",
    });
  }

  const { data: bookings, error } = await query;
  // console.log("Getting bookings", bookings);
  if (error) {
    console.log("error", error);
    throw new Error("Cabins could not be loaded");
  }
  return bookings;
};

export async function getBooking(id: number): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(last?: number): Promise<
  {
    created_at: string;
    totalPrice: number;
    extrasPrice: number;
  }[]
> {
  let date = "";
  let query = supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice");

  if (last) {
    date = subDays(new Date(), last).toISOString();
  }

  if (date) {
    query = query
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(
  last?: number,
): Promise<GetStaysAfterDate[]> {
  let date = "";
  let query = supabase.from("bookings").select("*, guests(fullName)");
  // .select("status");

  if (last) {
    date = subDays(new Date(), last).toISOString();
  }

  if (date) {
    query = query.gte("startDate", date).lte("startDate", getToday());
  }

  const { data, error } = await query;
  //   .in("status", [
  //   "checked-in",
  //   "checked-out",
  // ]);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: number, obj: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
