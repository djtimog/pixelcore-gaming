"use client";

import * as React from "react";
import {
  BookOpen,
  Frame,
  Map,
  MessageCircle,
  PieChart,
  Settings2,
  SquareTerminal,
  Trophy,
} from "lucide-react";

import { NavMain } from "@/components/ui/dashboard/nav-main";
import { NavProjects } from "@/components/ui/dashboard/nav-projects";
import { NavUser } from "@/components/ui/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { useUser } from "@clerk/nextjs";

const data = {
  navMain: [
    {
      title: "Tournaments",
      url: "#",
      icon: Trophy,
      items: [
        {
          title: "Available",
          url: "#",
        },
        {
          title: "Recent",
          url: "#",
        },
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
      ],
    },
    {
      title: "Chats",
      url: "#",
      icon: MessageCircle,
      items: [
        {
          title: "Friends",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Global",
          url: "#",
        },
        {
          title: "Tournament",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Language",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const navUser = {
    name: user?.fullName!,
    email: user?.emailAddresses[0]?.emailAddress!,
    avatar: user?.imageUrl!,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/">
          <Image src={logo} alt="Logo" width={70} height={80} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={"Dashboard"}>
                <SquareTerminal />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
