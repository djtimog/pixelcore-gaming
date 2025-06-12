"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

import { Get } from "@/lib/action/_get";
import { Post } from "@/lib/action/_post";
import {
  PlayerProfile,
  useDbUser,
} from "@/app/_components/context/DbUserProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DbTournamentDataType,
  MatchWithTeams,
  Team,
} from "@/lib/placeholder-data";
import LogoAnimation from "@/components/ui/loading-logo";
import { KeyRound, PlusCircle } from "lucide-react";
import TeamProvider, {
  useTeam,
} from "@/app/_components/context/DbTeamProvider";

function TeamPageComponent() {
  const router = useRouter();
  const { player, user } = useDbUser();
  const { dbTeam } = useTeam();
  const [members, setMembers] = useState<PlayerProfile[]>([]);
  const [tournaments, setTournaments] = useState<DbTournamentDataType[]>([]);
  const [matches, setMatches] = useState<MatchWithTeams[]>([]);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);

  // }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LogoAnimation />
      </div>
    );
  }

  // If user not in team
  if (dbTeam) {
    return (
      <div className="container mx-auto px-4 py-10">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h2 className="outlined-text text-center text-3xl tracking-wide">
            Team Setup
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            To participate in tournaments, you must be part of a team. You can
            either join an existing one with a secret code or create your own
            and invite others.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* JOIN TEAM CARD */}
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
      </div>
    );
  }
  // User is in a team
  // return (
  //   <motion.div
  //     className="container mx-auto space-y-8 px-4 py-10"
  //     initial={{ opacity: 0 }}
  //     animate={{ opacity: 1 }}
  //   >
  //     {/* Team Header */}
  //     <div className="flex items-center gap-4">
  //       {team.logoUrl && (
  //         <Image
  //           src={team.logoUrl}
  //           alt={team.name}
  //           width={80}
  //           height={80}
  //           className="rounded-full"
  //         />
  //       )}
  //       <div>
  //         <h1 className="text-3xl font-bold">{team.name}</h1>
  //         {/* <Badge>Team Captain: {team.captainName}</Badge> */}
  //       </div>
  //     </div>

  //     {/* Members Table */}
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Team Members</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <Table>
  //           <TableHeader>
  //             <TableRow>
  //               <TableHead>Name</TableHead>
  //               <TableHead>Role</TableHead>
  //               <TableHead>Game Handle</TableHead>
  //             </TableRow>
  //           </TableHeader>
  //           <TableBody>
  //             {members.map((member) => (
  //               <TableRow
  //                 key={member.id}
  //                 className={member.isCaptain ? "bg-gray-100" : ""}
  //               >
  //                 <TableCell>
  //                   {member.isCaptain ? "Captain" : "Player"}
  //                 </TableCell>
  //                 <TableCell>{member.gameHandle}</TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </CardContent>
  //     </Card>

  //     {/* Past Tournaments */}
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Past Tournaments</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <ScrollArea className="h-48">
  //           <div className="space-y-4">
  //             {tournaments.map((t) => (
  //               <Card key={t.id} className="p-4">
  //                 <h4 className="font-semibold">{t.name}</h4>
  //                 <p className="text-sm text-muted-foreground">
  //                   {new Date(t.startDate).toLocaleDateString()} -{" "}
  //                   {new Date(t.endDate).toLocaleDateString()}
  //                 </p>
  //               </Card>
  //             ))}
  //           </div>
  //         </ScrollArea>
  //       </CardContent>
  //     </Card>

  //     {/* Upcoming Matches */}
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Upcoming Matches</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         {matches.length > 0 ? (
  //           <ScrollArea className="h-48">
  //             <div className="space-y-4">
  //               {matches.map((m) => (
  //                 <Card key={m.id} className="p-4">
  //                   <h4 className="font-semibold">{m.round}</h4>
  //                   <p className="text-sm">
  //                     {new Date(m.matchDate).toLocaleDateString()} @{" "}
  //                     {m.matchTime.slice(0, 5)}
  //                   </p>
  //                 </Card>
  //               ))}
  //             </div>
  //           </ScrollArea>
  //         ) : (
  //           <p className="text-sm text-muted-foreground">
  //             No upcoming matches.
  //           </p>
  //         )}
  //       </CardContent>
  //     </Card>
  //   </motion.div>
  // );
}

export default function TeamPage() {
  return (
    <TeamProvider>
      <TeamPageComponent />
    </TeamProvider>
  );
}
