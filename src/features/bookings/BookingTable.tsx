// import { useSuspenseQuery } from "@tanstack/react-query";
//
// import { cabinsQueryOptions } from "@/services/apiCabins";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { CabinRow } from "./CabinRow";
import { Menus } from "@/components/Menus";
import { Empty } from "@/components/Empty";

export const BookingTable = () => {
  // const { data } = useSuspenseQuery(cabinsQueryOptions);
  const data: number[] = [];

  return (
    <Menus>
      <Table>
        <TableCaption>A list of your recent cabins.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]"></TableHead>
            <TableHead className="">Cabin</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <Empty resource="No data to show at the moment" />
          ) : (
            data.map(() => {
              return <p>Hello</p>;
            })
          )}
        </TableBody>
      </Table>
    </Menus>
  );
};

//   return <CabinRow cabin={cabin} key={cabin.id} />;
