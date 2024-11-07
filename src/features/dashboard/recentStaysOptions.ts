import { getStaysAfterDate } from "@/services/apiBookings";
import { queryOptions } from "@tanstack/react-query";

export const recentStaysOptions = ({ last }: { last?: number }) => {
  return queryOptions({
    queryKey: ["stays", `last-${last || "all"}`],
    queryFn: () => getStaysAfterDate(last),
  });
};
