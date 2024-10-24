import { createFileRoute } from "@tanstack/react-router";
import { bookingQueryOptions } from "@/features/bookings/bookingQueryOptions";
import { BookingDetail } from "@/features/bookings/BookingDetails";
import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/_auth/_layout/bookings/$bookingId")({
  loader: ({ context: { queryClient }, params: { bookingId } }) => {
    console.log("bookingId", bookingId);
    return queryClient.ensureQueryData(bookingQueryOptions(Number(bookingId)));
  },
  staleTime: 0,
  component: () => <BookingDetail />,
  pendingComponent: Loader,
  errorComponent: ({ error }) => {
    return (
      <>
        <p>Error!</p>
        <div>{error.message}</div>
      </>
    );
  },
});
