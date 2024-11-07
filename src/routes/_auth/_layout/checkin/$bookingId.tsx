import { createFileRoute } from "@tanstack/react-router";
import { bookingQueryOptions } from "@/features/bookings/bookingQueryOptions";
import { Loader } from "@/components/Loader";
import { CheckinBooking } from "@/features/check-in-out/CheckinBooking";

export const Route = createFileRoute("/_auth/_layout/checkin/$bookingId")({
  loader: ({ context: { queryClient }, params: { bookingId } }) => {
    console.log("bookingId", bookingId);
    return queryClient.ensureQueryData(bookingQueryOptions(Number(bookingId)));
  },
  staleTime: 0,
  component: () => <CheckinBooking />,
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
