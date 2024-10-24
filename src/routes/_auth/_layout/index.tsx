import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_layout/")({
  component: () => {
    return <Navigate to="/dashboard" />;
  },
});
