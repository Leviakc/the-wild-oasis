import { getRouteApi } from "@tanstack/react-router";
import { recentBookingsOptions } from "./recentBookingsOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { recentStaysOptions } from "./recentStaysOptions";
import { Stats } from "./Stats";
import { cabinsQueryOptions } from "@/services/apiCabins";
import { SalesChart } from "./SalesChart";
import { DurationChart } from "./DurationChart";
import { TodayActivity } from "../check-in-out/TodayActivity";

const routeApi = getRouteApi("/_auth/_layout/dashboard/");

export const DashboardLayout = () => {
  const { last = 7 } = routeApi.useSearch();
  const { data: bookings } = useSuspenseQuery(recentBookingsOptions({ last }));
  const { data: stays } = useSuspenseQuery(recentStaysOptions({ last }));
  const { data: cabins } = useSuspenseQuery(cabinsQueryOptions);

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_20rem_auto] gap-2">
      <Stats
        bookings={bookings}
        confirmedStays={stays}
        numDays={last}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={stays} />
      <SalesChart bookings={bookings} numDays={last} />
    </div>
  );
};

//   grid-template-rows: auto 34rem auto;
