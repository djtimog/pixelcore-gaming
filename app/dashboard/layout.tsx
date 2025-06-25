import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/dashboard/app-sidebar";
import DashboardHeader from "@/components/ui/dashboard/header";
import { DashboardContextProvider } from "../_components/context/DashboardContextProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />

          <div className="px-5 py-3">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </DashboardContextProvider>
  );
}
