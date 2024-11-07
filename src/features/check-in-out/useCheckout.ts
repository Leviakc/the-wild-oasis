import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "@/hooks/use-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(Number(bookingId), {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      queryClient.invalidateQueries();
      navigate({
        to: "/bookings",
        search: { sortBy: "startDate-asc" },
        replace: true,
      });
      toast({
        title: "Successfully checked out",
        description: `Booking #${data.id} successfully checked out`,
      });
    },
    onError: () => toast({ title: "There was an error while checking out" }),
  });

  return { checkout, isCheckingOut };
}
