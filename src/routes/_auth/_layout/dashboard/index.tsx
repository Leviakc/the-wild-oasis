import { recentBookingsOptions } from "@/features/dashboard/recentBookingsOptions";
import { recentStaysOptions } from "@/features/dashboard/recentStaysOptions";
import { cabinsQueryOptions } from "@/services/apiCabins";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const dashboardSchema = z.object({
  last: z.union([z.literal(7), z.literal(30), z.literal(90)]).optional(),
});

export const Route = createFileRoute("/_auth/_layout/dashboard/")({
  validateSearch: dashboardSchema,
  loaderDeps: ({ search: { last } }) => ({ last }),
  loader: async ({ context: { queryClient }, deps: { last } }) => {
    await queryClient.ensureQueryData(recentBookingsOptions({ last }));
    await queryClient.ensureQueryData(recentStaysOptions({ last }));
    await queryClient.ensureQueryData(cabinsQueryOptions);
  },
  staleTime: 0,
});
