import { ContextMenu } from "@/components/ContextMenu";
import { SortedIcon } from "@/components/SortedIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Cabin } from "@/services/apiCabins";
import { formatCurrency } from "@/utils/helpers";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Cabin>();

export const columns: ColumnDef<Cabin, "string">[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  columnHelper.accessor("image", {
    maxSize: 120,
    size: 100,
    header: "",
    cell: (url) => (
      <img
        src={url.row.original.image}
        alt={`${url.row.original.name} image`}
        className="mx-auto max-w-[120px]"
      />
    ),
  }),
  {
    accessorKey: "name",
    // header: "Cabin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="uppercase hover:bg-gray-400 dark:hover:bg-gray-700"
        >
          Cabin
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "maxCapacity",
    // header: "Capacity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="uppercase hover:bg-gray-400 dark:hover:bg-gray-700"
        >
          Capacity
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "regularPrice",
    // header: () => <div className="text-right">Price</div>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="uppercase hover:bg-gray-400 dark:hover:bg-gray-700"
        >
          Price
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("regularPrice"));
      return <div className="font-medium">{formatCurrency(price)}</div>;
    },
  },
  {
    accessorKey: "discount",
    // header: "Discount",
    cell: ({ row }) => {
      return row.original.discount ? (
        <span className="text-green-700 dark:text-green-500">
          {formatCurrency(row.original.discount)}
        </span>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <ContextMenu cabin={row.original} />;
    },
  },
];
