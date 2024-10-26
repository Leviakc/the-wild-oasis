import { fallbackPage } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const search = useSearch({ from: "/login" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess: async (user) => {
      // await queryClient.refetchQueries({ queryKey: ["user"] });
      console.log("user.user", user);
      queryClient.setQueryData(["user"], user);
      router.invalidate();

      navigate({
        to: search.redirect || fallbackPage,
      });
    },
    onError: (err) => {
      console.error("error", err);
      toast({
        title: "Provided email or password are incorrect",
        variant: "destructive",
      });
    },
  });

  return { mutate, isPending };
};
