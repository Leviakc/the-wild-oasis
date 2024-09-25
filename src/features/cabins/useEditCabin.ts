import { useToast } from "@/hooks/use-toast";
import { type EditCabin, updateCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseEditCabinProps {
  onCloseModal: () => void;
  name: string;
}

export const useEditCabin = ({ name, onCloseModal }: UseEditCabinProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: (cabin: EditCabin) => updateCabin(cabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast({
        variant: "success",
        title: `${name} updated`,
        description: `${name} updated with success`,
      });
      onCloseModal();
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
