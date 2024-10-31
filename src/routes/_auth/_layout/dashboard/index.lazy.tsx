import { Row } from "@/components/Row";
import { Heading } from "@/components/Heading";

import { createLazyFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/starter/features/dashboard/DashboardLayout";

export const Route = createLazyFileRoute("/_auth/_layout/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <Row variant={"horizontal"}>
        <Heading>Dashboard</Heading>
        <p>Test</p>
      </Row>

      <DashboardLayout />
    </>
  );
}
