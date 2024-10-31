import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

import type { Booking } from "@/services/apiBookings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SortedIcon } from "@/components/SortedIcon";
import { BookingContextMenu } from "./BookingContextMenu";

export const bookingsColumns: ColumnDef<Booking, "string">[] = [
  {
    id: "Cabin",
    header: "Cabin",
    // font-family: "Sono";
    cell: ({ row }) => (
      <span className="font-semibold text-gray-600 dark:text-gray-300">
        {row.original.cabins.name}
      </span>
    ),
  },
  {
    id: "Guest",
    header: "Guest",
    cell: ({ row }) => {
      return (
        <p className="flex flex-col gap-1 text-wrap">
          <span className="font-medium">{row.original.guests.fullName}</span>
          <span className="text-xs text-gray-500">
            {row.original.guests.email}
          </span>
        </p>
      );
    },
  },
  {
    id: "Dates",
    header: ({ column }) => {
      return (
        <Link
          to="."
          search={(prev) => ({
            ...prev,
            sortBy:
              column.getIsSorted() === "asc"
                ? "startDate-asc"
                : "startDate-desc",
          })}
        >
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
            className="uppercase hover:bg-gray-400 dark:hover:bg-gray-700"
          >
            Dates
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        </Link>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="flex flex-col gap-1 text-wrap">
          <span className="font-medium">
            {isToday(new Date(row.original.startDate))
              ? "Today"
              : formatDistanceFromNow(row.original.startDate)}{" "}
            &rarr; {row.original.numNights} night stay
          </span>
          <span className="text-xs text-gray-500">
            {format(new Date(row.original.startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(row.original.endDate), "MMM dd yyyy")}
          </span>
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      // if (row.original.status === "unconfirmed") {
      //   return <Badge variant="unconfirmed">{row.original.status}</Badge>;
      // }
      return <Badge variant={row.original.status}>{row.original.status}</Badge>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Link
          to="."
          search={(prev) => ({
            ...prev,
            sortBy:
              column.getIsSorted() === "asc"
                ? "totalPrice-asc"
                : "totalPrice-desc",
          })}
        >
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="uppercase hover:bg-gray-400 dark:hover:bg-gray-700"
          >
            Amount
            <SortedIcon isSorted={column.getIsSorted()} />
          </Button>
        </Link>
      );
    },
    cell: ({ row }) => {
      // font-family: "Sono";
      return (
        <p className="font-medium">{formatCurrency(row.original.totalPrice)}</p>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      // font-family: "Sono";
      // font-weight: 500;
      return <BookingContextMenu booking={row.original} />;
    },
  },
];
