import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/dashboard/app-sidebar";
import DashboardHeader from "@/components/ui/dashboard/header";
import { DbUserDetailsProvider } from "../_components/context/userDetails";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DbUserDetailsProvider>
      <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <DashboardHeader />

            <div className="px-5 py-3">{children}</div>
          </SidebarInset>
      </SidebarProvider>
    </DbUserDetailsProvider>
  );
}
