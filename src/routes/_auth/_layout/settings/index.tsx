import { settingsQueryOptions } from "@/services/apiSettings";
import { createFileRoute } from "@tanstack/react-router";

import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/_auth/_layout/settings/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(settingsQueryOptions);
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
