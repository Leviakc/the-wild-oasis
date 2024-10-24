import { Row } from "@/components/Row";
import { bookingsColumns } from "@/features/bookings/BookingColumns";
import { BookingTable } from "@/features/bookings/BookingTable";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useSearch } from "@tanstack/react-router";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { bookingsQueryOptions } from "@/features/bookings/bookingsQueryOptions";

export const Route = createLazyFileRoute("/_auth/_layout/bookings/")({
  component: Bookings,
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

function Bookings() {
  const { status, sortBy: sort } = useSearch({
    from: "/_auth/_layout/bookings/",
  });

  const filter =
    !status || status === "all" ? null : { field: "status", value: status };

  const sortByRaw = sort || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction } as {
    field: "startDate" | "totalPrice";
    direction: "asc" | "desc";
  };

  const { data } = useSuspenseQuery(bookingsQueryOptions({ filter, sortBy }));

  return (
    <>
      <Row variant="vertical">
        <Heading variant={"h1"}>All bookings</Heading>
      </Row>
      <BookingTable columns={bookingsColumns} data={data} />
    </>
  );
}
