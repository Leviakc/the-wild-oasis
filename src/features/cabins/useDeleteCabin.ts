import { useToast } from "@/hooks/use-toast";
import { type Cabin, deleteCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCabin = (cabinName: string) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: (cabin: Cabin) => deleteCabin(cabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast({
        variant: "success",
        title: `${cabinName} deleted`,
        description: `${cabinName} deleted with success`,
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
    isDeleting,
  };
};
