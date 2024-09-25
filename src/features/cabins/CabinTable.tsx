import { useSuspenseQuery } from "@tanstack/react-query";

import { cabinsQueryOptions } from "@/services/apiCabins";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CabinRow } from "./CabinRow";
import { Menus } from "@/components/Menus";
import { Empty } from "@/components/Empty";

export const CabinTable = () => {
  const { data } = useSuspenseQuery(cabinsQueryOptions);

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
            data.map((cabin) => {
              return <CabinRow cabin={cabin} key={cabin.id} />;
            })
          )}
        </TableBody>
      </Table>
    </Menus>
  );
};
