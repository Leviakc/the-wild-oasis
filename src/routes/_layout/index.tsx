import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: () => {
    return <Navigate to="/dashboard" />;
  },
});