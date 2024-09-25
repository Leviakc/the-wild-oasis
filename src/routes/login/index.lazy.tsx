import { createLazyFileRoute } from "@tanstack/react-router";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/Sidebar";

export const Route = createLazyFileRoute("/login/")({
  component: ResizableDemo,
});

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="max-w-md rounded-lg border md:min-w-[1050px]"
    >
      <ResizablePanel minSize={15} maxSize={25}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
