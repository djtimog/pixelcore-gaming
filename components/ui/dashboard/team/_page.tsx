"use client";

import React, { useEffect, useState } from "react";
import {
  PlayerProfile,
  useDbUser,
  UserProfile,
} from "@/app/_components/context/DbUserProvider";
import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import { Team } from "@/lib/placeholder-data";
import { format } from "date-fns";
import { Copy } from "lucide-react";

import LogoAnimation from "../../loading-logo";
import { ActionIconButton } from "../../action-icon";
import { TeamMember, TeamMembersTable } from "../table/team";
import { GameType } from "../card/game";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function DbTeamPage({ team }: { team: Team }) {
  const [loading, setLoading] = useState(true);
  const [teamOrganizer, setTeamOrganizer] = useState<UserProfile | null>(null);
  const [teamCaptain, setTeamCaptain] = useState<UserProfile | null>(null);
  const [teamAsstCaptain, setTeamAsstCaptain] = useState<UserProfile | null>(
    null,
  );
  const [game, setGame] = useState<GameType | null>(null);
  const [teamTableMembers, setTeamTableMembers] = useState<TeamMember[]>([]);
  const { player } = useDbUser();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [organizer, captain, asstCaptain, games, members] =
          await Promise.all([
            Get.UserById(team.creatorId),
            team.captainId ? Get.UserById(team.captainId) : null,
            team.asstCaptainId ? Get.UserById(team.asstCaptainId) : null,
            Get.Games(),
            Get.PlayersByTeamId(team.id),
          ]);

        if (!organizer) throw new Error("Creator not found");
        setTeamOrganizer(organizer);

        if (captain) setTeamCaptain(captain);
        if (asstCaptain) setTeamAsstCaptain(asstCaptain);

        const gameData = games.find((g) => g.id === team.gameId);
        if (!gameData) throw new Error("Game not found");
        setGame(gameData);

        const getRole = (id: number): TeamMember["role"] => {
          if (id === team.creatorId) return "owner";
          if (id === team.captainId) return "captain";
          if (id === team.asstCaptainId) return "assistant";
          return "player";
        };

        const tableData = await Promise.all(
          members.map(async (member) => {
            const [user, invites] = await Promise.all([
              Get.UserById(member.userId),
              Get.TeamInvitesByPlayerId(member.id),
            ]);
            if (!user || !invites) return undefined;

            const invite = invites.find((i) => i.teamId === team.id);

            return {
              id: member.id,
              name: user.name,
              username: user.username,
              role: getRole(user.id),
              email: user.email,
              joinedAt: invite?.updatedAt || team.createdAt,
              isCurrentUser: player?.id === member.id,
            };
          }),
        );

        setTeamTableMembers(
          tableData.filter((t): t is TeamMember => t !== undefined),
        );
      } catch (err) {
        toast({
          title: "Data Fetch Error",
          description: (err as Error).message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [team, player]);

  const createdAt = team.createdAt
    ? format(new Date(team.createdAt), "PPP")
    : "Unknown";

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LogoAnimation />
      </div>
    );
  }

  return (
    <div className="my-6 space-y-10 px-4 md:px-12">
      <div className="space-y-2 text-center">
        <h1 className="outlined-text text-4xl font-extrabold tracking-wide">
          Team Overview
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Get to know your team&apos;s identity, leadership, and game details.
          This page gives a full overview of your team&apos;s setup.
        </p>
      </div>

      <Card className="mx-auto w-full max-w-4xl">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <Avatar className="h-24 w-24 rounded-md">
            <AvatarImage src={team.logoUrl || ""} alt={team.name} />
            <AvatarFallback className="text-2xl">
              {team.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="truncate text-2xl font-bold">{team.name}</h1>
              <Badge variant="secondary">Created: {createdAt}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span>
                <strong>Creator:</strong> {teamOrganizer?.name || "Unknown"}
              </span>
              {teamCaptain && (
                <span>
                  <strong>Captain:</strong> 👑 {teamCaptain.username}
                </span>
              )}
              {teamAsstCaptain && (
                <span>
                  <strong>Asst.Captain:</strong> 👑 {teamAsstCaptain.username}
                </span>
              )}
              {game && (
                <span>
                  <strong>Game:</strong> 🎮 {game.name}
                </span>
              )}
            </div>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <strong>Team UID:</strong>
                <code className="rounded bg-muted px-2 py-0.5">{team.uid}</code>
                <ActionIconButton
                  action={() => copyToClipboard(team.uid)}
                  initialIcon={Copy}
                />
              </div>
              <div className="flex items-center gap-2">
                <strong>Secret Code:</strong>
                <code className="rounded bg-muted px-2 py-0.5">
                  {team.secretCode}
                </code>
                <ActionIconButton
                  action={() => copyToClipboard(team.secretCode)}
                  initialIcon={Copy}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamMembersTable teamData={teamTableMembers} />
        </CardContent>
      </Card>

      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Past Tournaments</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="text-sm text-muted-foreground">Coming soon...</div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Upcoming Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No upcoming matches.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DbTeamPage;
