// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "@/hooks/use-toast";
// import { Get } from "@/lib/action/_get";
// import Link from "next/link";
// import { Move3dIcon } from "lucide-react";

// type MatchWithTeams = {
//   id: number;
//   matchDate: string;
//   matchTime: string;
//   round: string;
//   status: string;
//   teams: { teamId: number; teamName: string }[];
// };

// export default function TournamentMatchesPage() {
//   const { uid } = useParams();
//   const router = useRouter();
//   const [matches, setMatches] = useState<MatchWithTeams[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!uid) return;
//     const fetchMatches = async () => {
//       try {
//         const ms = await Get.MatchesByTournamentId(uid as number);
//         setMatches(
//           ms.sort(
//             (a, b) =>
//               new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime(),
//           ),
//         );
//       } catch (err) {
//         console.error("Error fetching matches:", err);
//         toast({
//           title: "Error",
//           description: "Could not load matches.",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMatches();
//   }, [uid]);

//   if (loading) {
//     return <div className="mt-10 text-center">Loading matches...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-10 md:px-0">
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="flex items-center gap-2 text-2xl font-bold">
//           <Move3dIcon size={24} /> Tournament Matches
//         </h2>
//         <Link href={`/dashboard/tournaments/${uid}/matches/new`}>
//           <Button variant="default">Schedule New Match</Button>
//         </Link>
//       </div>

//       {matches.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm">
//             <thead className="border-b">
//               <tr>
//                 <th className="py-2">Date</th>
//                 <th>Time</th>
//                 <th>Round</th>
//                 <th>Teams</th>
//                 <th>Status</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {matches.map((m) => (
//                 <tr key={m.id} className="border-b hover:bg-gray-50">
//                   <td className="py-2">
//                     {new Date(m.matchDate).toLocaleDateString()}
//                   </td>
//                   <td>{m.matchTime.slice(0, 5)}</td>
//                   <td>{m.round}</td>
//                   <td>{m.teams.map((t) => t.teamName).join(" vs. ")}</td>
//                   <td>{m.status}</td>
//                   <td className="text-right">
//                     <Link
//                       href={`/dashboard/tournaments/${uid}/matches/${m.id}`}
//                     >
//                       <Button size="sm" variant="outline">
//                         Edit
//                       </Button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-sm text-muted-foreground">
//           No matches scheduled yet.
//         </p>
//       )}
//     </div>
//   );
// }

import React from "react";

function UidMatches() {
  return <div>under constructiom</div>;
}

export default UidMatches;
