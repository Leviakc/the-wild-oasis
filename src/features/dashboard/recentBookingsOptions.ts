import { getBookingsAfterDate } from "@/services/apiBookings";
import { queryOptions } from "@tanstack/react-query";

export const recentBookingsOptions = ({ last }: { last?: number }) => {
  return queryOptions({
    queryKey: ["bookings", `last-${last}`],
    queryFn: () => getBookingsAfterDate(last),
  });
};
