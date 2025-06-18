"use client";
import React, { useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TranslationProvider } from "../context/TranslationContext";
import { usePathname } from "next/navigation";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showHeaderFooter = useMemo(() => {
    const validPaths = ["/", "/about", "/team", "/contact", "/blog"];
    return validPaths.includes(pathname);
  }, [pathname]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TranslationProvider>
        {showHeaderFooter && <Header />}
        {children}
        <Toaster />
        {showHeaderFooter && <Footer />}
      </TranslationProvider>
    </ThemeProvider>
  );
}
