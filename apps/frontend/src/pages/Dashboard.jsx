import { AppSidebar } from "@/components/app-sidebar";
import { GettingStarted } from "@/components/getting_started.jsx";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span className="text-sm font-medium">Suivi des demandes</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid grid-cols-1 gap-10 py-5 lg:px-12">
            <div>
              <h1 className="text-2xl font-bold">Suivi des demandes</h1>
            </div>

            <div>
              <GettingStarted />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
