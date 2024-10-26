import { useToast } from "@/hooks/use-toast";
import { signup } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      // await queryClient.refetchQueries({ queryKey: ["user"] });
      console.log("user", user);
      toast({
        title:
          "Account successfully created! Please verify the new account from the user's email address",
        variant: "success",
      });
    },
  });

  return {
    signup: mutate,
    isPending,
  };
};
