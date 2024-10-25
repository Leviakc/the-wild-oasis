import { ButtonIcon } from "@/components/ButtonIcon";
import { LogOut } from "lucide-react";
import { useLogout } from "./useLogout";

export const Logout = () => {
  const { mutate: logout, isPending } = useLogout();
  return (
    <ButtonIcon onClick={() => logout()} disabled={isPending}>
      <LogOut />
    </ButtonIcon>
  );
};
