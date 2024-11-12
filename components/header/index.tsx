'use client';
import { MouseEvent, KeyboardEvent, useState } from "react";
import Link from "next/link";
import { Menu, MenuItem, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { ExpandMore, Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import Image from "next/image";
import logo from "@/public/logo.png";


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

const handleLanguageClick = (event: MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleLanguageClose = () => {
  setAnchorEl(null);
};

const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
  if (event.type === "keydown" && ((event as KeyboardEvent).key === "Tab" || (event as KeyboardEvent).key === "Shift")) {
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
                className={item.active ? "text-[#E84424] text-lg" : ""}
                passHref
            >
                {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <button
            className="flex items-center space-x-1"
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
        </div>

        <div className="md:hidden">
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <div className="p-4 w-64 h-full">
              <div className="flex justify-between items-center mb-4">
                <Image src={logo} alt="Logo" width={50} height={50} />
                <div className="flex items-center space-x-1">
                    <button onClick={handleLanguageClick}>
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
                <IconButton color="inherit" onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </div>
              <List>
                {navItems.map((item) => (
                  <ListItem key={item.label} onClick={toggleDrawer(false)}>
                    <Link href={item.href} className={item.active ? "text-[#E84424] text-lg" : ""} passHref>
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
