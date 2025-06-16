"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ban,
  CheckCheck,
  Clock,
  KeyRound,
  LucideIcon,
  PlusCircle,
  Trash2,
} from "lucide-react";

import { useDbUser } from "@/app/_components/context/DbUserProvider";
import { Get } from "@/lib/action/_get";
import { InviteData } from "@/lib/placeholder-data";

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
import LogoAnimation from "../../loading-logo";
import { Delete } from "@/lib/action/_post";
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

function NoTeamPage() {
  const router = useRouter();
  const { player } = useDbUser();
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [invites, setInvites] = useState<InviteData[] | null>(null);
  const [teamNames, setTeamNames] = useState<Record<string, string>>({});

  async function fetchInvites() {
    const data = await Get.TeamInvitesByPlayerId(player.id);
    if (!data) return;
    setInvites(data);

    // Fetch team names
    const names: Record<string, string> = {};
    for (const invite of data) {
      const team = await Get.TeamById(invite.teamId);
      if (team) names[invite.teamId] = team.name;
    }
    setTeamNames(names);
  }

  useEffect(() => {
    if (player?.id) fetchInvites();
  }, [player]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="outlined-text text-center text-3xl tracking-wide">
          Team Setup
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          To participate in tournaments, you must be part of a team. You can
          either join an existing one with a secret code or create your own and
          invite others.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="space-y-4 p-6 text-center">
          <CardHeader className="flex flex-col items-center space-y-2">
            <KeyRound className="h-10 w-10 text-blue-600" />
            <CardTitle className="text-2xl">Join a Team</CardTitle>
            <p className="text-sm text-muted-foreground">
              Have a team code? Enter it below to join an existing team and
              start competing.
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
                <Button className="mt-4 w-full">Submit</Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="space-y-4 p-6 text-center">
          <CardHeader className="flex flex-col items-center space-y-2">
            <PlusCircle className="h-10 w-10 text-green-600" />
            <CardTitle className="text-2xl">Create a Team</CardTitle>
            <p className="text-sm text-muted-foreground">
              Be the team leader! Create a new team and invite others to join
              using a secret code.
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
                <TableHead>Status</TableHead>
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
                      className={`${statusStyles[invite.status ?? "default"]} flex items-center gap-2 pt-1`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="capitalize">
                        {invite.status ?? "pending"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {invite.updatedAt
                        ? new Date(invite.updatedAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <ActionIconButton
                        initialIcon={Trash2}
                        action={async () => {
                          await Delete.TeamInvites(invite.id);
                          await fetchInvites();
                        }}
                        className="size-4 text-red-500 hover:bg-red-100"
                      />
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

export default NoTeamPage;
