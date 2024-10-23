import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { ClockArrowDown, ClockArrowUp, EyeIcon, Trash2 } from "lucide-react";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

import type { Booking } from "@/services/apiBookings";
import { Modal } from "@/components/Modal";
import { Menus } from "@/components/Menus";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SortedIcon } from "@/components/SortedIcon";

export const bookingsColumns: ColumnDef<Booking, "string">[] = [
  {
    id: "Cabin",
    header: "Cabin",
    // font-family: "Sono";
    cell: ({ row }) => (
      <span className="font-semibold text-gray-600">
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
            className="uppercase hover:bg-gray-400"
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
            className="uppercase hover:bg-gray-400"
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
      const { id: bookingId, status } = row.original;
      // font-family: "Sono";
      // font-weight: 500;
      return (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Link
                to="/bookings/$bookingId"
                params={{
                  bookingId: bookingId.toString(),
                }}
              >
                <Menus.Button icon={<EyeIcon color="#111" />}>
                  See details
                </Menus.Button>
              </Link>

              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<ClockArrowDown color="#111" />}
                  // onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  icon={<ClockArrowUp color="#111" />}
                  // onClick={() => checkout(bookingId)}
                  // disabled={isCheckingOut}
                >
                  Check out
                </Menus.Button>
              )}
              <Modal.Open opens="delete">
                <Menus.Button icon={<Trash2 color="#111" />}>
                  Delete booking
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="delete">
            {/* <ConfirmDelete */}
            {/*   resourceName="booking" */}
            {/*   disabled={isDeleting} */}
            {/*   onConfirm={() => deleteBooking(bookingId)} */}
            {/* /> */}
          </Modal.Window>
        </Modal>
      );
    },
  },
];
