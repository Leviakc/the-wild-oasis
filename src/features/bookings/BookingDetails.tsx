import { Row } from "@/components/Row";
import { useMoveBack } from "../../hooks/useMoveBack";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ButtonGroup";
import { ButtonText } from "@/components/ButtonText";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { bookingQueryOptions } from "./bookingQueryOptions";
import { BookingDataBox } from "./BookingDataBox";
import { Badge } from "@/components/ui/badge";
import { useCheckout } from "../check-in-out/useCheckout";
import { Modal } from "@/components/Modal";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

export function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { mutate, isDeletingBooking } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  const bookingId = useParams({ strict: false }).bookingId;
  const { data: booking } = useSuspenseQuery(
    bookingQueryOptions(Number(bookingId)),
  );

  return (
    <>
      <Row variant={"horizontal"}>
        <div className="flex items-center gap-6">
          <Heading variant="h1">Booking #{booking.id}</Heading>
          <Badge variant={booking.status} className="scale-125">
            {booking.status.replace("-", " ")}
          </Badge>
        </div>
        <ButtonText moveBack={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button variant={"destructive"}>Delete booking</Button>
          </Modal.Open>

          <Modal.Window
            name="delete"
            render={(close) => (
              <ConfirmDelete
                resourceName={"booking"}
                disabled={isDeletingBooking}
                onCloseModal={close}
                onConfirm={() => {
                  mutate(booking.id, {
                    onSettled() {
                      close();
                      navigate({
                        to: "/bookings",
                        search: { sortBy: "startDate-asc" },
                        replace: true,
                      });
                    },
                  });
                }}
              />
            )}
          />
        </Modal>

        {booking.status === "unconfirmed" && (
          <Button
            disabled={isDeletingBooking}
            onClick={() =>
              navigate({
                to: "/checkin/$bookingId",
                params: { bookingId: booking.id.toString() },
              })
            }
          >
            Check in
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button
            onClick={() => checkout(Number(bookingId))}
            disabled={isCheckingOut || isDeletingBooking}
          >
            Check out
          </Button>
        )}

        <Button
          variant="secondary"
          onClick={moveBack}
          disabled={isDeletingBooking}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
