import PageNotFound from "@/pageNotFound";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { Toaster } from "@/components/ui/toaster";
import { Loader } from "@/components/Loader";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  pendingComponent: Loader,
  notFoundComponent: PageNotFound,
  errorComponent: (error) => {
    console.error(error);
    return <div>Error</div>;
  },
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  );
}
