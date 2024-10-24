import { bookingsQueryOptions } from "@/features/bookings/bookingsQueryOptions";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Loader } from "@/components/Loader";

const bookingsSchema = z.object({
  status: z
    .enum(["all", "unconfirmed", "checked-in", "checked-out"])
    .optional(),
  sortBy: z
    .enum([
      "startDate-desc",
      "startDate-asc",
      "totalPrice-desc",
      "totalPrice-asc",
    ])
    .default("startDate-asc"),
});

// type BookingsSearch = z.infer<typeof bookingsSchema>;

export const Route = createFileRoute("/_auth/_layout/bookings/")({
  validateSearch: bookingsSchema,
  // WARN: This is not working correctly so instead we are using zod for search
  // validation
  // validateSearch: (search: Record<string, unknown>): BookingsSearch => {
  //   // validate and parse the search params into a typed state
  //   return {
  //     status: search.filter as BookingsStatusSearchOptions,
  //     //     sort: search.sort as "asc" | "desc",
  //   };
  // },
  loaderDeps: ({ search: { status, sortBy: sort } }) => ({ status, sort }),
  pendingComponent: Loader,
  loader: ({ context: { queryClient }, deps: { status, sort } }) => {
    const filter =
      !status || status === "all" ? null : { field: "status", value: status };

    const sortByRaw = sort || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction } as {
      field: "startDate" | "totalPrice";
      direction: "asc" | "desc";
    };

    return queryClient.ensureQueryData(
      bookingsQueryOptions({
        filter,
        sortBy,
      }),
    );
  },
  staleTime: 0,
});
