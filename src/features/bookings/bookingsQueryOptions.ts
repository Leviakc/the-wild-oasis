import { getBookings, GetBookingsProps } from "@/services/apiBookings";
import { queryOptions } from "@tanstack/react-query";

export const bookingsQueryOptions = ({ filter, sortBy }: GetBookingsProps) => {
  return queryOptions({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
};
