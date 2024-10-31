import { Logout } from "@/features/authentication/Logout";
import { ButtonIcon } from "./ButtonIcon";
import { useNavigate } from "@tanstack/react-router";
import { User } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useThemeToggle } from "@/hooks/useThemeToggle";

export const HeaderMenu = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <ul className="flex gap-1">
      <li>
        <ButtonIcon onClick={() => navigate({ to: "/account" })}>
          <User />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={toggleTheme}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
};
