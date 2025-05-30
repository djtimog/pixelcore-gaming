"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TranslationProvider } from "../context/TranslationContext";
import { usePathname } from "next/navigation";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showHeader, setShowHeader] = useState<boolean>();
  const validPaths: string[] = ["/", "/about", "/team", "/contact"];

  useEffect(() => {
    const checkPath = () => {
      const result = validPaths.find((path) => path === pathname);
      if (result) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };
    checkPath();
  }, [pathname, validPaths]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TranslationProvider>
        {showHeader && <Header />}
        {children}
        <Toaster />
        {showHeader && <Footer />}
      </TranslationProvider>
    </ThemeProvider>
  );
}
