import { useToast } from "@/hooks/use-toast";
import { login } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess: (user) => {
      console.log("user", user);
      navigate({
        to: "/dashboard",
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
