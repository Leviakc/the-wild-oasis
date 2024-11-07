import { Button } from "@/components/ui/button";
import { useCheckout } from "./useCheckout";

export function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}
