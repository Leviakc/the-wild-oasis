import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import { DataItem } from "@/components/DataItem";
import { Flag } from "@/components/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { Booking } from "@/services/apiBookings";
// A purely presentational component
export function BookingDataBox({ booking }: { booking: Booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: {
      fullName: guestName,
      email,
      nationality,
      countryFlag,
      nationalID,
    },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className="my-2.5 overflow-hidden rounded-md border border-solid border-gray-100 bg-white">
      <header className="flex items-center justify-between bg-brand-500 px-10 py-5 text-lg font-medium text-[#e0e7ff] [&_div:first-child]:flex [&_div:first-child]:items-center [&_div:first-child]:gap-4 [&_div:first-child]:text-lg [&_div:first-child]:font-semibold [&_span]:ml-1 [&_span]:text-xl [&_svg]:h-8 [&_svg]:w-8">
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="px-10 pb-3 pt-8">
        <div className="mb-4 flex items-center gap-3 text-gray-500 [&>p]:first-of-type:font-medium [&>p]:first-of-type:text-gray-700">
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
          )}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        {/* <div isPaid={isPaid}> */}
        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </section>

      <footer className="px-10 py-4 text-right text-xs text-gray-500">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

function Price({
  children,
  isPaid,
}: {
  children: React.ReactNode;
  isPaid: boolean;
}) {
  console.log("isPaid:", isPaid); // Debugging line to check the value of isPaid
  const baseClasses =
    "mt-6 flex items-center justify-between rounded-sm px-8 py-4 text-current [&_p:last-child]:text-sm [&_p:last-child]:font-semibold [&_p:last-child]:uppercase [&_svg]:h-6 [&_svg]:w-6";
  const paidClasses = "bg-[--color-green-100] text-[--color-green-700]";
  const unpaidClasses = "bg-[--color-yellow-100] text-[--color-yellow-700]";

  return (
    <div className={`${baseClasses} ${isPaid ? paidClasses : unpaidClasses}`}>
      {children}
    </div>
  );
}
//   background-color: ${(props) =>
//     props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
//   color: ${(props) =>
//     props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};
//
