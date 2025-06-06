"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { usePathname } from "next/navigation";
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
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { AlignJustify, LogIn, X } from "lucide-react";
import ProfileImage from "@/components/ui/profile-image";
import { Button } from "@/components/ui/button";
import LanguageButton from "../ui/language-switcher";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blog" },
  { label: "Schedule", href: "/dashboard/schedule" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },

];

const Header = () => {
  const pathname = usePathname();


  return (
    <header className="sticky top-0 z-50 bg-inherit p-4">
      <div className="md:px mx-auto flex items-center justify-between px-5 lg:container xl:px-11">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="Logo" width={70} height={80} />
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={pathname === item.href ? "text-lg text-[#14C570]" : ""}
              passHref
              data-translate
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <LanguageButton />

          <ModeToggle />

          <Auth />
        </div>

        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex justify-center space-x-5">
                <SignedIn>
                  <ProfileImage />
                </SignedIn>
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
                              <Button
                                size={"sm"}
                              >
                                Sign In
                              </Button>
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
                    <li key={item.label} className="my-2 hover:bg-secondary px-4 py-2 rounded-md">
                      <DrawerClose asChild>
                        <Link
                          href={item.href}
                          className={
                            `${pathname === item.href
                              ? "text-lg text-[#14C570]"
                              : ""} w-full flex items-center justify-start`
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
};

export default Header;
