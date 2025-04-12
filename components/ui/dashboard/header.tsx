"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../sidebar";
import { CreatBreadCrumb } from "./get-breadcrumb";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Auth from "@/components/ui/auth";
import { SignedOut } from "@clerk/nextjs";
import { AlignJustify, LogIn, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import LanguageButton from "../language-switcher";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { navItems } from "@/components/header";
import { usePathname } from "next/navigation";

function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 shadow-md transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <CreatBreadCrumb />
      </div>

      <div className="px-4">
        <div className="hidden items-center space-x-4 md:flex">
          <LanguageButton />

          <ModeToggle />

          <Auth />
        </div>

        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex justify-center space-x-5">
                <Auth />

                <Button
                  size={"icon"}
                  className="rounded-full hover:text-primary"
                  variant={"outline"}
                >
                  <AlignJustify />
                </Button>
              </div>
            </DrawerTrigger>

            <DrawerContent className="fixed bottom-0 right-0 h-full max-h-min shadow-lg">
              <div className="my-auto max-h-max p-4">
                <DrawerHeader>
                  <DrawerTitle className="mb-4 flex items-center justify-between space-x-2 sm:space-x-5">
                    <Image src={logo} alt="Logo" width={50} height={50} />

                    <div className="flex items-center">
                      <LanguageButton />
                    </div>

                    <div className="flex justify-center">
                      <ModeToggle />
                    </div>

                    <>
                      <SignedOut>
                        <div className="cursor-pointer">
                          <DrawerClose asChild>
                            <Link href="/sign-in" className="hidden sm:block">
                              <Button size={"sm"}>Sign In</Button>
                            </Link>
                          </DrawerClose>

                          <DrawerClose asChild>
                            <Link href="/sign-in" className="sm:hidden">
                              <LogIn size="16" />
                            </Link>
                          </DrawerClose>
                        </div>
                      </SignedOut>
                    </>

                    <DrawerClose asChild>
                      <Button
                        size={"icon"}
                        className="rounded-full hover:text-primary"
                        variant={"outline"}
                      >
                        <X />
                      </Button>
                    </DrawerClose>
                  </DrawerTitle>
                </DrawerHeader>
                <ul>
                  {navItems.map((item) => (
                    <li
                      key={item.label}
                      className="my-2 rounded-md px-4 py-2 hover:bg-secondary"
                    >
                      <DrawerClose asChild>
                        <Link
                          href={item.href}
                          className={
                            pathname === item.href
                              ? "text-lg text-[#14C570]"
                              : ""
                          }
                          passHref
                        >
                          <span> {item.label} </span>
                        </Link>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
