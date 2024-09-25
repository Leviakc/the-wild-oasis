import { cabinsQueryOptions } from "@/services/apiCabins";
import { createFileRoute } from "@tanstack/react-router";

import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/_layout/cabins/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(cabinsQueryOptions);
    // queryClient.ensureQueryData(cabinsQueryOptions)
  },
  pendingComponent: Loader,
  errorComponent: ({ error }) => {
    // Render an error message
    return (
      <>
        <p>Error!</p>
        <div>{error.message}</div>
      </>
    );
  },
});
