"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, MessageCircle, Trash2, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Get } from "@/lib/action/_get";
import { InviteData, Team, TeamPlayersData } from "@/lib/placeholder-data";
import { ScrollArea } from "../../scroll-area";
import { Delete, Update } from "@/lib/action/_post";
import { ActionIconButton } from "../../action-icon";

export default function PlayersInviteCard({
  currentUserRole,
  team,
}: {
  currentUserRole: string;
  team: Team;
}) {
  const [invites, setInvites] = useState<InviteData[]>([]);
  const [players, setPlayers] = useState<Record<number, TeamPlayersData>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const invitesFromServer = await Get.TeamInvitesByTeamId(team.id);
      const playerData: Record<number, TeamPlayersData> = {};

      if (!invitesFromServer) return;

      for (const invite of invitesFromServer) {
        const player = await Get.PlayerById(invite.playerId);

        if (player) {
          playerData[invite.playerId] = player;
        }
      }
      const InvitesData = invitesFromServer.reverse();
      setInvites(InvitesData);
      setPlayers(playerData);
    } catch (err) {
      console.error("Failed to fetch invites or players", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserRole !== "owner") return;

    const fetchData = async () => {
      try {
        const invitesFromServer = await Get.TeamInvitesByTeamId(team.id);
        const playerData: Record<number, TeamPlayersData> = {};

        if (!invitesFromServer) return;

        for (const invite of invitesFromServer) {
          const player = await Get.PlayerById(invite.playerId);

          if (player) {
            playerData[invite.playerId] = player;
          }
        }
        const InvitesData = invitesFromServer.reverse();
        setInvites(InvitesData);
        setPlayers(playerData);
      } catch (err) {
        console.error("Failed to fetch invites or players", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserRole]);

  const handleAccept = async (inviteId: number) => {
    const status = "accepted";
    await Update.TeamInviteWithStatus(status, inviteId);
    await fetchData();
  };

  const handleReject = async (inviteId: number) => {
    const status = "rejected";
    await Update.TeamInviteWithStatus(status, inviteId);
    await fetchData();
  };

  if (currentUserRole !== "owner") return null;

  return (
    <Card className="mx-auto w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Players Invite</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        ) : (
          <ScrollArea className="max-h-48">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game Handle</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-center">Sent</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invites.map((invite) => {
                  const player = players[invite.playerId];
                  return (
                    <TableRow key={invite.id}>
                      <TableCell>{player?.gameHandle || "N/A"}</TableCell>
                      <TableCell>{player?.rank || "Unranked"}</TableCell>
                      <TableCell>{player?.level ?? "-"}</TableCell>
                      <TableCell className="text-center">
                        {invite.updatedAt
                          ? new Date(invite.updatedAt).toLocaleString()
                          : "-"}
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        {invite.status === "accepted" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="cursor-not-allowed border-green-600 bg-green-800 text-white hover:bg-green-800 hover:text-white"
                            >
                              <CheckCircle2 className="h-4 w-4" /> Accepted
                            </Button>
                            <ActionIconButton
                              initialIcon={MessageCircle}
                              action={async () => {
                                // message
                              }}
                            />
                          </>
                        )}

                        {invite.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-600 text-green-600 hover:bg-green-800 hover:text-inherit"
                              onClick={() => handleAccept(invite.id)}
                            >
                              <CheckCircle2 className="h-4 w-4" /> Accept
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-600 hover:bg-red-800 hover:text-inherit"
                              onClick={() => handleReject(invite.id)}
                            >
                              <XCircle className="h-4 w-4" /> Reject
                            </Button>
                          </>
                        )}

                        {invite.status === "rejected" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="cursor-not-allowed border-red-600 bg-red-800 text-white hover:bg-red-800 hover:text-white"
                            >
                              <XCircle className="h-4 w-4" /> Rejected
                            </Button>
                            <ActionIconButton
                              initialIcon={Trash2}
                              action={async () => {
                                await Delete.TeamInvites(invite.id);
                                await fetchData();
                              }}
                              className="text-red-500 hover:text-red-800"
                            />
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
