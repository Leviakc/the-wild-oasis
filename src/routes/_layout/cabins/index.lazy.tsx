import { Heading } from "@/components/Heading";
import { Row } from "@/components/Row";
import { AddCabin } from "@/features/cabins/AddCabin";
import { CabinTable } from "@/features/cabins/CabinTable";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/cabins/")({
  component: Cabin,
});

function Cabin() {
  return (
    <>
      <Row variant="vertical">
        <Heading variant={"h1"}>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}
