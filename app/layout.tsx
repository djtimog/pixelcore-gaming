import type { Metadata } from "next";
import "./globals.css";
import { Orbitron } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/app/provider";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "PIXEL CORE",
  description:
    "Join pixelcore esport team, a dedicated esports team competing in top-tier tournaments across games like [List Games, e.g., Call of Duty, League of Legends, Valorant]. Fueled by passion, teamwork, and strategy, we aim to dominate the competitive scene while fostering a community of gamers and fans worldwide. Stay updated with match schedules, team news, and exclusive content on our official website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${orbitron.className} antialiased`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
