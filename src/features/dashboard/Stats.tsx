import type { GetStaysAfterDate } from "@/services/apiBookings";
import { Stat } from "./Stat";
import {
  Banknote,
  BriefcaseBusiness,
  CalendarDays,
  ChartColumnIncreasing,
} from "lucide-react";

import { formatCurrency } from "@/utils/helpers";

type StatsProps = {
  bookings: {
    created_at: string;
    totalPrice: number;
    extrasPrice: number;
  }[];
  confirmedStays: GetStaysAfterDate[];
  numDays: number;
  cabinCount: number;
};

export const Stats = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: StatsProps) => {
  // 1.
  const numBookings = bookings.length;
  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  4;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  // num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<BriefcaseBusiness />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<Banknote />}
      />
      <Stat
        title="Check ins"
        color="indigo"
        value={checkins}
        icon={<CalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
        icon={<ChartColumnIncreasing />}
      />
    </>
  );
};
