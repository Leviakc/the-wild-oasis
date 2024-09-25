import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
