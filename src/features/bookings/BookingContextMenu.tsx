import { ClockArrowDown, ClockArrowUp, EyeIcon, Trash2 } from "lucide-react";
import { Modal } from "@/components/Modal";
import { Menus } from "@/components/Menus";
import { Booking } from "@/services/apiBookings";
import { Link, useNavigate } from "@tanstack/react-router";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { useCheckout } from "../check-in-out/useCheckout";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

export const BookingContextMenu = ({ booking }: { booking: Booking }) => {
  const { id: bookingId, status } = booking;
  const { theme } = useThemeToggle();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { mutate, isDeletingBooking } = useDeleteBooking();
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
              onClick={() =>
                navigate({
                  to: "/checkin/$bookingId",
                  params: { bookingId: bookingId.toString() },
                })
              }
            >
              Check in
            </Menus.Button>
          )}

          {status === "checked-in" && (
            <Menus.Button
              icon={<ClockArrowUp color={colorIcon} />}
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}
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

      <Modal.Window
        name="delete"
        render={(close) => (
          <ConfirmDelete
            resourceName={"booking"}
            disabled={isDeletingBooking}
            onCloseModal={close}
            onConfirm={() => {
              mutate(bookingId, {
                onSettled() {
                  close();
                },
              });
            }}
          />
        )}
      ></Modal.Window>
    </Modal>
  );
};
