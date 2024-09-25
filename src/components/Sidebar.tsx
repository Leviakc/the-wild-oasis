import { MainNav } from "./MainNav";

export const Sidebar = () => {
  return (
    <aside className="row-start-1 row-end-[-1] flex flex-col gap-8 border border-solid border-gray-100 bg-white px-6 py-8">
      <div className="mx-auto">
        <img src="/logo-light.png" alt="Logo" className="h-24 w-auto" />
      </div>
      <MainNav />
    </aside>
  );
};
