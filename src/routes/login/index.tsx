import { Heading } from "@/components/Heading";
import { LoginForm } from "@/features/authentication/LoginForm";
import { createFileRoute } from "@tanstack/react-router";
//   grid-template-columns: 48rem;
// `;

export const Route = createFileRoute("/login/")({
  component: () => (
    <main className="grid min-h-screen place-content-center content-center justify-center gap-8 bg-gray-50">
      <img
        src="/logo-light.png"
        alt="Logo"
        className="h-24 justify-self-center"
      />
      <Heading variant={"h4"}>Log in to your account</Heading>
      <LoginForm />
    </main>
  ),
});
