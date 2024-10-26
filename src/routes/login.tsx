import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { fallbackPage } from "@/constants";
import { LoginForm } from "@/features/authentication/LoginForm";
import { userQueryOptions } from "@/services/apiAuth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: async ({ context: { queryClient }, search }) => {
    const auth = await queryClient.ensureQueryData(userQueryOptions());
    if (auth?.user.aud === "authenticated") {
      throw redirect({ to: search.redirect || fallbackPage });
    }
  },
  pendingComponent: () => (
    <div className="grid h-screen place-content-center">
      <Loader size={160} />
    </div>
  ),
  component: () => (
    //   grid-template-columns: 48rem;
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
