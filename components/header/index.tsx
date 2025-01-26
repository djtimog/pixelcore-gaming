"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import {
  ExpandMore,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Auth from "@/components/ui/auth";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

const LanguageButton = ({
  currentLanguage,
  handleLanguageClick,
}: {
  currentLanguage: string;
  handleLanguageClick: (language: string) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <p className="hover:text-[#14C570] flex items-center space-x-1 border-[0px] p-1">
        <ExpandMore />
        <span className="font-medium">{currentLanguage}</span>
      </p>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" className="absolute w-max">
      {["EN", "FR", "ES"].map((lang) => (
        <DropdownMenuItem
          key={lang}
          onClick={() => handleLanguageClick(lang)}
          className="max-w-max"
        >
          {lang}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const Header = () => {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");

  const pathname = usePathname();

  const handleLanguageClick = (language: string) => {
    setCurrentLanguage(language);
  };

  // const toggleDrawer =
  //   (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
  //     if (
  //       event.type === "keydown" &&
  //       ((event as KeyboardEvent).key === "Tab" ||
  //         (event as KeyboardEvent).key === "Shift")
  //     ) {
  //       return;
  //     }
  //     setDrawerOpen(open);
  //   };

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
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageButton
            currentLanguage={currentLanguage}
            handleLanguageClick={handleLanguageClick}
          />
          <ModeToggle />
          <Auth />
        </div>

        <div className="md:hidden">
          {/* <div className="md:hidden">
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              className=""
            >
              <div className="p-4 w-75 h-full bg-initial">

                <div className="flex justify-between items-center mb-4 space-x-5">

                  <Image src={logo} alt="Logo" width={50} height={50} />


                  <div className="flex items-center">
                    <LanguageButton
                      currentLanguage={currentLanguage}
                      handleLanguageClick={handleLanguageClick}
                      anchorEl={anchorEl}
                      handleLanguageClose={handleLanguageClose}
                    />
                  </div>

                  <div className="flex justify-center">
                    <ModeToggle />
                  </div>

                  <IconButton color="inherit" onClick={toggleDrawer(false)}>
                    <CloseIcon />
                  </IconButton>
                </div>

                <List>
                  {navItems.map((item) => (
                    <ListItem key={item.label} onClick={toggleDrawer(false)}>
                      <Link
                        href={item.href}
                        className={pathname === item.href ? "text-[#14C570] text-lg" : ""}
                        passHref
                      >
                        <ListItemText primary={item.label} />
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Drawer>
          </div> */}
          <Drawer>
            <DrawerTrigger asChild>
              <div className="space-x-5 flex justify-center">
                <SignedIn>
                  <UserButton />
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
                      <LanguageButton
                        currentLanguage={currentLanguage}
                        handleLanguageClick={handleLanguageClick}
                      />
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex justify-center">
                      <ModeToggle />
                    </div>

                    <>
                      <SignedOut>
                        <DrawerClose asChild>
                          <div className="bg-[#14C570] rounded-lg px-3 py-2 font-medium text-sm cursor-pointer">
                            {/* For larger screens */}
                            <div className="hidden sm:block">
                              <SignInButton />
                            </div>

                            {/* For small screens */}
                            <div
                              className="sm:hidden text-xs"
                              onClick={() => {
                                // Trigger the Clerk sign-in function programmatically
                                const clerk = window.Clerk; // Access Clerk instance
                                if (clerk) {
                                  clerk.openSignIn(); // Opens the Clerk Sign-in modal
                                }
                              }}
                            >
                              <LogIn />
                            </div>
                          </div>
                        </DrawerClose>
                      </SignedOut>
                    </>

                    {/* Close Button */}
                    <DrawerClose asChild>
                      <IconButton color="inherit">
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
