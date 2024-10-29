import { createLazyFileRoute } from "@tanstack/react-router";
import { Heading } from "@/components/Heading";
import { Row } from "@/components/Row";
import { UpdateUserDataForm } from "@/features/authentication/UpdateUserDataForm";
import { UpdatePasswordForm } from "@/features/authentication/UpdatePasswordForm";

export const Route = createLazyFileRoute("/_auth/_layout/account/")({
  component: Account,
});

function Account() {
  return (
    <>
      <Heading variant={"h1"}>Update your account</Heading>
      <Row className="gap-2">
        <Heading variant="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row className="gap-2">
        <Heading variant="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}
