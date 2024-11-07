import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "@/hooks/use-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast: Record<string, unknown>;
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      queryClient.invalidateQueries();
      navigate({
        to: "/bookings",
        search: { sortBy: "startDate-asc" },
        replace: true,
      });
      toast({
        title: "Successfully checked in",
        description: `Booking #${data.id} successfully checked in`,
      });
    },
    onError: () => toast({ title: "There was an error while checking in" }),
  });

  return { checkin, isCheckingIn };
}
