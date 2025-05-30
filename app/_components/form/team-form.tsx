// "use client";

// import { useState, useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { toast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRouter } from "next/navigation";
// import { Get } from "@/lib/action/_get";
// import { Post, Delete, Update } from "@/lib/action/_post";
// import { TeamData, TeamFormValues, TeamPlayersData } from "@/lib/placeholder-data";
// import { TeamFormSchema } from "@/lib/form-schema";
// import { useUser } from "@clerk/nextjs";

// const TeamSignUpForm = () => {
//   const { user } = useUser();
//   const [isLoading, setIsLoading] = useState(false);
//   const [previewLogo, setPreviewLogo] = useState<string | null>(null);
//   const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
//   const [gameNames, setGameNames] = useState<string[]>([]);
//   const [teamPlayers, setTeamPlayers] = useState<TeamPlayersData[]>([]);
//   const [existingTeam, setExistingTeam] = useState<TeamData | null>(null);
//   const router = useRouter();
//   const [userId, setUserId] = useState<number>(0)

//   const form = useForm<TeamFormValues>({
//     resolver: zodResolver(TeamFormSchema),
//     defaultValues: {
//       name: "",
//       game: "",
//       logoUrl: "",
//     },
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       if (user) {
//         const userEmail = user.emailAddresses[0]?.emailAddress || "";
//         const userName = user.username || "";

//         const existingUser = await Get.UserByEmail(userEmail);

//         if ( !existingUser || existingUser.username !== userName ) {
//           toast({
//             title: "Error",
//             description: "User not found!!",
//             variant: "destructive",
//           });
//           router.push("/user-sign-up");
//           return;
//         }

//         const userId = existingUser.id;
//         const team = await Get.TeamByCaptainId(userId);
//         setUserId(existingUser.id);

//         if (team) {

//         const games = await Get.Games();
//         console.log(games)
//         setGameNames(games.map((game) => game.name));

//         const teamGame = games.find((game) => game.id === team.gameId);

//           setExistingTeam(team);

//           form.reset({
//             name: team.name,
//             game: teamGame?.name || "",
//             logoUrl: team.logoUrl || "",
//           });
//           setPreviewLogo(team.logoUrl);


//           const players = await Get.PlayersByTeamId(team.id);
//           setTeamPlayers(players);
//         }
//       }
//     };
//     fetchData();
//   }, [user, router, form]);

//   const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedLogoFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewLogo(reader.result as string);
//       };
//       reader.readAsDataURL(selectedLogoFile || file);
//     }
//   };

//   async function onSubmit(data: TeamFormValues) {
//     if (!user) return;
//     const userEmail = user.emailAddresses[0]?.emailAddress || "";
//     const userName = user.username || "";

//     const existingUser = await Get.UserByEmail(userEmail);

//     if ( !existingUser || existingUser.username !== userName ) {
//       toast({
//         title: "Error",
//         description: "User not found!!",
//         variant: "destructive",
//       });
//       router.push("/user-sign-up");
//       return;
//     }

//     const userId = existingUser.id;
//     const games = await Get.Games();

//     setIsLoading(true);
//     try {
//       const teamData = {
//         name: data.name,
//         gameId: games.find((game) => game.name === data.game)?.id || 1,
//         captainId: userId,
//         logoUrl: previewLogo || "",
//       };

//       if (existingTeam) {
//         await Update.TeamData(existingTeam.id, teamData);
//         toast({
//           title: "Success!",
//           description: "Team updated successfully",
//         });
//       } else {
//         await Post.TeamData(teamData);
//         toast({
//           title: "Success!",
//           description: "Team created successfully",
//         });
//       }
//       router.refresh();
//     } catch (error) {
//       console.error("Error saving team:", error);
//       toast({
//         title: "Submission Failed",
//         description: "An error occurred while saving team data",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }


//   const handleRemovePlayer = async (playerId: number) => {
//     if (!existingTeam) return;

//     try {
//       await Delete.Player(playerId);
//       const updatedPlayers = teamPlayers.filter(
//         (player) => player.id !== playerId
//       );
//       setTeamPlayers(updatedPlayers);
//       toast({
//         title: "Player Removed",
//         description: "Player has been removed from the team",
//       });
//     } catch (error) {
//       console.error("Error removing player:", error);
//       toast({
//         title: "Removal Failed",
//         description: "An error occurred while removing player",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <section className="p-6">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6 p-6 rounded-lg shadow-md"
//         >
//           {/* Team Logo */}
//           <FormField
//             control={form.control}
//             name="logoUrl"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Team Logo</FormLabel>
//                 <div className="flex items-center gap-4">
//                   {previewLogo && (
//                     <Image
//                       src={previewLogo}
//                       alt="Team logo preview"
//                       className="w-20 h-20 rounded-full object-cover"
//                       width={80}
//                       height={80}
//                     />
//                   )}
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleLogoUpload}
//                     />
//                   </FormControl>
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Team Name */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Team Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Team Name" required />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Game Selection */}
//           <FormField
//             control={form.control}
//             name="game"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Game Name</FormLabel>
//                 <FormControl>
//                   <Select
//                     {...field}
//                     onValueChange={(value) => field.onChange(value)}
//                     required
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Pick a Game" />
//                     </SelectTrigger>

//                     <SelectContent>
//                       {gameNames.map((game) => (
//                         <SelectItem value={game} key={game}>
//                           {game}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading
//               ? "Saving..."
//               : existingTeam
//               ? "Update Team"
//               : "Create Team"}
//           </Button>
//         </form>
//       </Form>

      
//       {existingTeam && (
//         <div className="mt-8 p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-4">Team Members</h3>
//           {teamPlayers.length === 0 ? (
//             <p className="text-muted-foreground">No players in the team yet</p>
//           ) : (
//             <div className="space-y-4">
//               {teamPlayers.map((player) => (
//                 <div
//                   key={player.id}
//                   className="flex items-center justify-between p-3 border rounded-lg"
//                 >
//                   <div>
//                     <p className="font-medium">{player.gameHandle}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {player.rank || "No rank specified"}
//                     </p>
//                   </div>
//                   {userId === existingTeam.captainId && (
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => handleRemovePlayer(player.id)}
//                     >
//                       Remove
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
     
//     </section>
//   );
// };

// export default TeamSignUpForm;

export const TeamSignUpForm = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Team Sign Up Form</h2>
      <p className="text-muted-foreground mb-6">
        This form is currently under development. Please check back later.
      </p>
      {/* Placeholder for future form implementation */}
      <div className="p-4 rounded-lg">
        <p className="text-center text-gray-500">Form will be available soon!</p>
      </div>
    </div>
  );
}