"use client";
import { MouseEvent, KeyboardEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  MenuItem,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  ExpandMore,
  Menu as MenuIcon,
  Close as CloseIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import logo from "@/public/logo.png";
import { useTheme } from "@/app/context/theme-context";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLanguageClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "About us", href: "/about" },
    { label: "Schedule", href: "/schedule" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="p-4">
      <div className="container mx-auto flex items-center justify-between">
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
              className={item.active ? "text-[#14C570] text-lg" : ""}
              passHref
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button
            className="flex items-center space-x-1 hover:text-[#14C570]"
            onClick={handleLanguageClick}
          >
            <ExpandMore />
            <span>EN</span>
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageClose}
          >
            <MenuItem onClick={handleLanguageClose}>EN</MenuItem>
            <MenuItem onClick={handleLanguageClose}>FR</MenuItem>
            <MenuItem onClick={handleLanguageClose}>ES</MenuItem>
          </Menu>
          <IconButton onClick={toggleTheme} color="inherit">
            {theme === "light" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>

        <div className="md:hidden">
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <div className="p-4 w-75 h-full">
              <div className="flex justify-between items-center mb-4 space-x-5">
                <Image src={logo} alt="Logo" width={50} height={50} />
                <div className="flex items-center">
                  <button
                    onClick={handleLanguageClick}
                    className="hover:text-[#14C570]"
                  >
                    <ExpandMore />
                    <span>EN</span>
                  </button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleLanguageClose}
                  >
                    <MenuItem onClick={handleLanguageClose}>EN</MenuItem>
                    <MenuItem onClick={handleLanguageClose}>FR</MenuItem>
                    <MenuItem onClick={handleLanguageClose}>ES</MenuItem>
                  </Menu>
                </div>
                <div className="flex justify-center">
                  <IconButton onClick={toggleTheme} color="inherit">
                    {theme === "light" ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
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
                      className={item.active ? "text-[#14C570] text-lg" : ""}
                      passHref
                    >
                      <ListItemText primary={item.label} />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
