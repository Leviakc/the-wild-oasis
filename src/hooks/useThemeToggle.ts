import { DarkModeContext } from "@/context/DarkModeContext";
import { useContext } from "react";

export const useThemeToggle = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined || context === null)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
};
