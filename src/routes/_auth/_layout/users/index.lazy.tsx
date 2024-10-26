import { Heading } from "@/components/Heading";
import { SignupForm } from "@/features/authentication/SignupForm";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/_layout/users/")({
  component: Users,
});

function Users() {
  return (
    <>
      <Heading variant="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}
