import { Row } from "@/components/Row";
import { Heading } from "@/components/Heading";
import { createLazyFileRoute } from "@tanstack/react-router";
import { UpdateSettingsForm } from "@/features/settings/UpdateSettingsForm";

export const Route = createLazyFileRoute("/_layout/settings/")({
  component: Settings,
});

function Settings() {
  return (
    <>
      <Row>
        <Heading variant="h1">Update hotel settings</Heading>
        <UpdateSettingsForm />
      </Row>
    </>
  );
}
