import { useToast } from "@/hooks/use-toast";
import { updateSetting } from "@/services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSetting = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending: isUpdating } = useMutation({
    // mutationFn: (settings: NewSettings) => updateSetting(settings),
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast({
        variant: "success",
        title: "Setting successfully edited",
      });
    },
    onError: (err) => {
      toast({
        title: "Cabins failed",
        // style: {
        //   backgroundColor: "plum",
        //   color: "blue",
        // },
        description: err.message,
      });
    },
  });
  return {
    mutate,
    isUpdating,
  };
};
