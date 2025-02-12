"use client";
import Link from "next/link";
import Image from "next/image";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
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
import { LogIn } from "lucide-react";
import ProfileImage from "@/components/ui/profile-image";
import { Button } from "@/components/ui/button";
import LanguageButton from "../ui/language-switcher";

const Header = () => {

  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Schedule", href: "/schedule" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="p-4 sticky top-0 z-50 bg-inherit">
      <div className="lg:container mx-auto xl:px-11 px-5 md:px flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="Logo" width={70} height={80} />
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={pathname === item.href ? "text-[#14C570] text-lg" : ""}
              passHref
              data-translate
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageButton />

          <ModeToggle />

          <Auth />
        </div>

        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="space-x-5 flex justify-center">
                <SignedIn>
                  <ProfileImage />
                </SignedIn>
                <IconButton color="inherit">
                  <MenuIcon />
                </IconButton>
              </div>
            </DrawerTrigger>
            <DrawerContent className="fixed bottom-0 right-0 h-full max-h-min shadow-lg">
              <div className="my-auto max-h-max p-4">
                <DrawerHeader>
                  <DrawerTitle className="flex justify-between items-center mb-4 space-x-2 sm:space-x-5">
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
                                className="hover:text-[#14C570]"
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
                      <IconButton
                        color="inherit"
                        className="hover:text-[#14C570]"
                      >
                        <CloseIcon />
                      </IconButton>
                    </DrawerClose>
                  </DrawerTitle>
                </DrawerHeader>
                <List>
                  {navItems.map((item) => (
                    <ListItem key={item.label}>
                      <DrawerClose asChild>
                        <Link
                          href={item.href}
                          className={
                            pathname === item.href
                              ? "text-[#14C570] text-lg"
                              : ""
                          }
                          passHref
                        >
                          <ListItemText primary={item.label} />
                        </Link>
                      </DrawerClose>
                    </ListItem>
                  ))}
                </List>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
