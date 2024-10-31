import { UserAvatar } from "@/features/authentication/UserAvatar";
import { HeaderMenu } from "./HeaderMenu";

export const Header = () => {
  return (
    <header className="flex items-center justify-end gap-6 border border-solid border-gray-100 bg-white px-10 py-3 dark:border-gray-800 dark:bg-[#18212f]">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
};
