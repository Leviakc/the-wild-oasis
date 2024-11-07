import { useToast } from "@/hooks/use-toast";
import { deleteBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBooking = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending: isDeletingBooking } = useMutation({
    mutationFn: (bookingId: number) => deleteBooking(bookingId),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast({
        variant: "success",
        title: `Booking  deleted`,
        description: `Booking deleted with success`,
      });
    },
    onError: (err) => {
      toast({
        title: "Cabins failed",
        description: err.message,
      });
    },
  });
  return {
    mutate,
    isDeletingBooking,
  };
};
