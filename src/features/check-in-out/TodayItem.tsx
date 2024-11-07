import { Flag } from "@/components/Flag";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CheckoutButton } from "../check-in-out/CheckoutButton";
import { Badge } from "@/components/ui/badge";

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <li className="first:border-t-solid grid grid-cols-[5.5rem_1.25rem_1fr_4.25rem_5.5rem] items-center gap-3 border border-solid border-gray-100 bg-white px-1 py-2 text-sm first:border-t first:border-t-gray-100 dark:border-gray-800 dark:bg-[#18212f] dark:first:border-t-gray-800">
      {status === "unconfirmed" && <Badge variant="checked-in">Arriving</Badge>}
      {status === "checked-in" && (
        <Badge variant="unconfirmed">Departing</Badge>
      )}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <div className="font-medium">{guests.fullName}</div>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Link to={`/checkin/${id}`}>
          <Button size="sm">Check in</Button>
        </Link>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </li>
  );
}

export default TodayItem;
