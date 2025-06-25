"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Ban,
  CheckCheck,
  CheckCircle,
  Clock,
  EllipsisVertical,
  KeyRound,
  PlusCircle,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  useDbUser,
  useTeam,
} from "@/app/_components/context/DashboardContextProvider";
import { Get } from "@/lib/action/_get";
import { Post, Delete, Update } from "@/lib/action/_post";
import { handleTeamLookup } from "@/lib/team-look-up";
import { toast } from "@/hooks/use-toast";

import { InviteData, Team } from "@/lib/placeholder-data";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogoAnimation from "../../loading-logo";
import { ActionIconButton } from "../../action-icon";

const statusStyles: Record<string, string> = {
  pending: "text-yellow-600 font-medium",
  accepted: "text-green-600 font-medium",
  rejected: "text-red-600 font-medium",
  default: "text-gray-500 italic",
};

const statusIcon = (status: string): LucideIcon => {
  switch (status) {
    case "pending":
      return Clock;
    case "rejected":
      return Ban;
    case "accepted":
      return CheckCheck;
    default:
      return Clock;
  }
};

export default function NoTeamPage() {
  const router = useRouter();
  const { player } = useDbUser();
  const { setDbTeam } = useTeam();
  const searchParams = useSearchParams();

  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [invites, setInvites] = useState<InviteData[] | null>(null);
  const [teamNames, setTeamNames] = useState<Record<string, string>>({});
  const [teamId, setTeamId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const paramsSecretCode = searchParams.get("secret_code");

  const fetchInvites = async () => {
    if (!player?.id) return;
    const data = await Get.TeamInvitesByPlayerId(player.id);
    if (!data) return;

    setInvites(data);

    const names: Record<string, string> = {};
    await Promise.all(
      data.map(async (invite) => {
        const team = await Get.TeamById(invite.teamId);
        if (team) names[invite.teamId] = team.name;
      }),
    );
    setTeamNames(names);
  };

  useEffect(() => {
    if (paramsSecretCode) {
      setJoinDialogOpen(true);
      setSecretCode(paramsSecretCode);
    }

    if (player?.id) fetchInvites();
  }, [player]);

  const handleSecretSubmit = async () => {
    setLoading(true);

    await handleTeamLookup(secretCode, setTeamId);

    if (teamId) {
      const hasPending = invites?.some(
        (invite) => invite.teamId === teamId && invite.status === "pending",
      );

      if (hasPending) {
        toast({
          title: "Duplicate Submission",
          description: "You already have a pending invite.",
        });
        return setLoading(false);
      }

      await Post.TeamInviteData({ playerId: player.id, teamId });
      await fetchInvites();
    }

    setLoading(false);
  };

  const handleDelete = async (inviteId: number) => {
    await Delete.TeamInvites(inviteId);
    await fetchInvites();
  };

  const handleConfirm = async (teamId: number) => {
    const [team, result] = await Promise.all([
      Get.TeamById(teamId),
      Update.PlayerWithTeamId(teamId, player.id),
    ]);
    if (!result) {
      toast({
        title: "Error",
        description: "Failed to update player with team.",
        variant: "destructive",
      });
      return;
    }
    if (!team) {
      toast({
        title: "Team Not Found",
        description: "The team you are trying to join does not exist.",
        variant: "destructive",
      });
      return;
    }
    setDbTeam(team);
    await fetchInvites();
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="outlined-text text-3xl tracking-wide">Team Setup</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          To participate in tournaments, you must be part of a team. Join one
          with a secret code or create your own.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="space-y-4 p-6 text-center">
          <CardHeader className="flex flex-col items-center space-y-2">
            <KeyRound className="h-10 w-10 text-blue-600" />
            <CardTitle className="text-2xl">Join a Team</CardTitle>
            <p className="text-sm text-muted-foreground">
              Have a team code? Enter it to join an existing team.
            </p>
          </CardHeader>
          <CardContent>
            <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full">
                  Join Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="mb-4 text-lg">
                  Enter Team Secret Code
                </DialogTitle>
                <Input
                  placeholder="Secret Code"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                />
                <Button
                  className="mt-4 w-full"
                  disabled={secretCode.length < 7 || loading}
                  onClick={handleSecretSubmit}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="space-y-4 p-6 text-center">
          <CardHeader className="flex flex-col items-center space-y-2">
            <PlusCircle className="h-10 w-10 text-green-600" />
            <CardTitle className="text-2xl">Create a Team</CardTitle>
            <p className="text-sm text-muted-foreground">
              Be a leader! Create a team and invite others with a secret code.
            </p>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="w-full"
              onClick={() => router.push("/dashboard/team/create")}
            >
              Create Team
            </Button>
          </CardContent>
        </Card>
      </div>

      {invites === null ? (
        <div className="my-14 flex items-center justify-center">
          <LogoAnimation />
        </div>
      ) : invites.length > 0 ? (
        <div className="mt-10">
          <h3 className="mb-4 text-xl font-semibold">Your Team Invites</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => {
                const Icon = statusIcon(invite.status ?? "default");

                return (
                  <TableRow key={invite.id}>
                    <TableCell className="truncate">
                      {teamNames[invite.teamId] ?? invite.teamId}
                    </TableCell>
                    <TableCell
                      className={`${statusStyles[invite.status ?? "default"]} text-center`}
                    >
                      <p className="flex items-center justify-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="capitalize">
                          {invite.status ?? "pending"}
                        </span>
                      </p>
                    </TableCell>
                    <TableCell>
                      {invite.updatedAt
                        ? new Date(invite.updatedAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {invite.status === "accepted" ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <EllipsisVertical className="size-4" />
                              <span className="sr-only">Open actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleDelete(invite.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Invite
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleConfirm(invite.teamId)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Confirm Invitation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <ActionIconButton
                          initialIcon={Trash2}
                          action={() => handleDelete(invite.id)}
                          className="size-4 text-red-500 hover:text-red-800"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
