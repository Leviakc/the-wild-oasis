import { Heading } from "@/components/Heading";
import { Row } from "@/components/Row";
import { AddCabin } from "@/features/cabins/AddCabin";
import { CabinTable } from "@/features/cabins/CabinTable";
import { columns } from "@/features/cabins/Columns";
import { cabinsQueryOptions } from "@/services/apiCabins";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/Loader";

export const Route = createLazyFileRoute("/_auth/_layout/cabins/")({
  component: Cabin,
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

function Cabin() {
  const { data } = useSuspenseQuery(cabinsQueryOptions);
  return (
    <>
      <Row variant="vertical">
        <Heading variant={"h1"}>All cabins</Heading>
      </Row>
      <Row>
        <CabinTable columns={columns} data={data} />
        <AddCabin />
      </Row>
    </>
  );
}
