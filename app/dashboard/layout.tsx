import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/dashboard/app-sidebar";
import DashboardHeader from "@/components/ui/dashboard/header";
// import { UserDetailsProvider } from "../_components/context/userDetails";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <UserDetailsProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />

        <div className="px-5 py-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
    // </UserDetailsProvider>
  );
}
