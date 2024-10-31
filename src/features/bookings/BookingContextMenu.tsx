import { ClockArrowDown, ClockArrowUp, EyeIcon, Trash2 } from "lucide-react";
import { Modal } from "@/components/Modal";
import { Menus } from "@/components/Menus";
import { Booking } from "@/services/apiBookings";
import { Link } from "@tanstack/react-router";
import { useThemeToggle } from "@/hooks/useThemeToggle";

export const BookingContextMenu = ({ booking }: { booking: Booking }) => {
  const { id: bookingId, status } = booking;
  const { theme } = useThemeToggle();
  const colorIcon = theme === "dark" ? "#eee" : "#111";

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
            <Menus.Button icon={<EyeIcon color={colorIcon} />}>
              See details
            </Menus.Button>
          </Link>

          {status === "unconfirmed" && (
            <Menus.Button
              icon={<ClockArrowDown color={colorIcon} />}
              // onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Menus.Button>
          )}
          {status === "checked-in" && (
            <Menus.Button
              icon={<ClockArrowUp color={colorIcon} />}
              // onClick={() => checkout(bookingId)}
              // disabled={isCheckingOut}
            >
              Check out
            </Menus.Button>
          )}
          <Modal.Open opens="delete">
            <Menus.Button icon={<Trash2 color={colorIcon} />}>
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
};
