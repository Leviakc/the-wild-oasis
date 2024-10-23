import { createFileRoute } from "@tanstack/react-router";
import { bookingQueryOptions } from "@/features/bookings/bookingQueryOptions";
import { BookingDetail } from "@/features/bookings/BookingDetails";
import { Loader } from "@/components/Loader";

// import { z } from "zod";
//
// const bookingSchema = z.object({
//   bookingId: z.number(),
// });

export const Route = createFileRoute("/_layout/bookings/$bookingId")({
  loader: ({ context: { queryClient }, params: { bookingId } }) => {
    console.log("bookingId", bookingId);
    return queryClient.ensureQueryData(bookingQueryOptions(Number(bookingId)));
  },
  staleTime: 0,
  component: () => <BookingDetail />,
  pendingComponent: Loader,
  errorComponent: ({ error }) => {
    // Render an error message
    return (
      <>
        <p>Error!</p>
        <div>{error.message}</div>
      </>
    );
  },
});
