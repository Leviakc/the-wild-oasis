import { createContext, useState, useEffect } from "react";

type Theme = "dark" | "light";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const DarkModeContext = createContext<ThemeContextType | null>(null);

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"),
  );

  useEffect(() => {
    const themeClass = theme === "dark" ? "dark" : "light";
    document.documentElement.classList.add(themeClass);
    document.documentElement.classList.remove(
      theme === "dark" ? "light" : "dark",
    );
  }, [theme]); // Runs only when `theme` changes

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
