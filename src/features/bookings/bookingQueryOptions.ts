import { getBooking } from "@/services/apiBookings";

import { queryOptions } from "@tanstack/react-query";

export const bookingQueryOptions = (bookingId: number) => {
  return queryOptions({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
};
