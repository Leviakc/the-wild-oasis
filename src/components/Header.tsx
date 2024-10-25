import { Logout } from "@/features/authentication/Logout";

export const Header = () => {
  return (
    <header className="border border-solid border-gray-100 bg-white px-10 py-3">
      <Logout />
    </header>
  );
};
