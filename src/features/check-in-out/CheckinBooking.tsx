import { Row } from "@/components/Row";
import { useMoveBack } from "../../hooks/useMoveBack";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ButtonGroup";
import { ButtonText } from "@/components/ButtonText";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { bookingQueryOptions } from "../bookings/bookingQueryOptions";
import { BookingDataBox } from "../bookings/BookingDataBox";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { settingsQueryOptions } from "@/services/apiSettings";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "@/utils/helpers";

export function CheckinBooking() {
  const moveBack = useMoveBack();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const bookingId = useParams({ strict: false }).bookingId;

  const { checkin, isCheckingIn } = useCheckin();

  const { data: booking } = useSuspenseQuery(
    bookingQueryOptions(Number(bookingId)),
  );
  const { data: settings } = useSuspenseQuery(settingsQueryOptions);

  useEffect(() => {
    setConfirmPaid(booking.isPaid ?? false);
  }, [booking.isPaid]);

  const optionalBreakfastPrice =
    settings.breakfastPrice * booking.numNights * booking.numGuests;

  function handleCheckin() {
    {
      if (!confirmPaid) return;

      if (addBreakfast) {
        checkin({
          bookingId: Number(bookingId),
          breakfast: {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: booking.totalPrice + optionalBreakfastPrice,
          },
        });
      } else {
        checkin({ bookingId: Number(bookingId), breakfast: {} });
      }
    }
  }

  return (
    <>
      <Row variant={"horizontal"}>
        <div className="flex items-center gap-6">
          <Heading variant="h1">Check in booking #{booking.id}</Heading>
        </div>
        <ButtonText moveBack={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.hasBreakfast && (
        <div className="mb-3 flex items-center space-x-2 rounded-md border border-solid border-gray-100 bg-white px-10 py-6 dark:border-gray-800 dark:bg-gray-800">
          <Checkbox
            checked={addBreakfast}
            onCheckedChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          />

          <label htmlFor="breakfast">
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </label>
        </div>
      )}

      <div className="mb-3 flex items-center space-x-2 rounded-md border border-solid border-gray-100 bg-white px-10 py-6 dark:border-gray-800 dark:bg-gray-800">
        <Checkbox
          checked={confirmPaid}
          onCheckedChange={() => {
            setConfirmPaid((confirm) => !confirm);
          }}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        />
        <label htmlFor="confirm">
          I confirm that {booking.guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(booking.totalPrice)
            : `${formatCurrency(
                booking.totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(booking.totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </label>
      </div>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
