import { Row } from "@/components/Row";
import { useMoveBack } from "../../hooks/useMoveBack";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ButtonGroup";
import { ButtonText } from "@/components/ButtonText";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { bookingQueryOptions } from "./bookingQueryOptions";
import { BookingDataBox } from "./BookingDataBox";
import { Badge } from "@/components/ui/badge";

export function BookingDetail() {
  const moveBack = useMoveBack();
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
        <Button variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
