import { useToast } from "@/hooks/use-toast";
import { updateCurrentUser, UpdateUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: (values: UpdateUser) => updateCurrentUser(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        variant: "success",
        title: "user updated",
        description: "User account updated with success",
      });
    },
    onError: (err) => {
      toast({
        title: "User update failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });
  return {
    updateUser: mutate,
    isUpdating,
  };
};
