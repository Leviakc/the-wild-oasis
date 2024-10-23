import { cabinsQueryOptions } from "@/services/apiCabins";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/cabins/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(cabinsQueryOptions);
  },
});
