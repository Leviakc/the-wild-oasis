import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: () => {
    return (
      <>
        <div className="grid h-screen grid-cols-[17rem_1fr] grid-rows-[auto_1fr]">
          <Header />
          <Sidebar />
          <main className="overflow-scroll bg-gray-50 px-12 pb-16 pt-10 dark:bg-gray-900">
            <Outlet />
          </main>
        </div>
      </>
    );
  },
});
