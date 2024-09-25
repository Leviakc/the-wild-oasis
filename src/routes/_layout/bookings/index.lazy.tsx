import { BookingTable } from "@/features/bookings/BookingTable";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/bookings/")({
  component: Bookings,
});

function Bookings() {
  return (
    <>
      <BookingTable />
    </>
  );
}
