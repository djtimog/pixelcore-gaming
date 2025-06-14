import { TeamProvider } from "@/app/_components/context/DbTeamProvider";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TeamProvider>{children}</TeamProvider>;
}
