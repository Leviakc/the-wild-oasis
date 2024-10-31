import Uploader from "@/data/Uploader";
import { MainNav } from "./MainNav";
import { useThemeToggle } from "@/hooks/useThemeToggle";

export const Sidebar = () => {
  const { theme } = useThemeToggle();
  const src = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  return (
    <aside className="row-start-1 row-end-[-1] flex flex-col gap-8 overflow-scroll border border-solid border-gray-100 bg-white px-6 py-8 dark:border-gray-800 dark:bg-[#18212f]">
      <div className="mx-auto">
        <img src={src} alt="Logo" className="h-24 w-auto" />
      </div>
      <MainNav />

      <Uploader />
    </aside>
  );
};
