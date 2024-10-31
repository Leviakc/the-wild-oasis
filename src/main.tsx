import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import "./styles/index.css";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DarkModeProvider>
  </StrictMode>,
);
