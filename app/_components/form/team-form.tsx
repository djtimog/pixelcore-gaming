"use client";

import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CloudUpload, Pencil, Copy, Share } from "lucide-react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Get } from "@/lib/action/_get";
import { GameType } from "@/components/ui/dashboard/card/game";
import { TeamFormValues } from "@/lib/placeholder-data";
import { useDbUser } from "@/app/_components/context/DbUserProvider";
import { onSubmitForm } from "@/lib/action/_onSubmit-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTeamCreate } from "../provider/team-provider";

const fileTypes = ["JPG", "PNG", "GIF"];

const formSchema = z.object({
  name: z.string().min(2, "Team name is required"),
  gameId: z.string().min(1, "Select a game"),
});

function TeamForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [games, setGames] = useState<GameType[]>([]);
  const [prefix, setPrefix] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, player } = useDbUser();
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const { setOpenDialog, setTeamCode } = useTeamCreate();
  const form = useForm<TeamFormValues>({
    resolver: zodResolver(formSchema),
  });

  if (player.teamId) {
    router.push("/dashboard/team");
  }
  useEffect(() => {
    const fetchGames = async () => {
      const data = await Get.Games();
      setGames(data);
    };
    fetchGames();
  }, []);

  const onSubmit = async (data: TeamFormValues) => {
    setLoading(true);
    await onSubmitForm.Team(
      data,
      router,
      setTeamCode,
      setOpenDialog,
      user.id,
      image,
      player.id,
      prefix,
    );
    setLoading(false);
  };

  const handleFileChange = (file: File) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Team</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg p-6 shadow-md"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your team name"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gameId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game Name</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a game" />
                      </SelectTrigger>
                      <SelectContent>
                        {games.map((game) => (
                          <SelectItem key={game.id} value={String(game.id)}>
                            {game.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label htmlFor="gameId">Select Game</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Upload Team Logo</Label>
              <div
                className={`flex items-center justify-center rounded-md text-center text-gray-500 ${previewUrl ? "border border-primary" : "border-2 border-dashed"}`}
              >
                <FileUploader
                  name="file"
                  types={fileTypes}
                  handleChange={handleFileChange}
                  classes="w-full h-full flex items-center justify-center p-5"
                >
                  {previewUrl ? (
                    <div className="relative w-full overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Uploaded Preview"
                        className="h-48 w-full rounded-md object-cover"
                        width={200}
                        height={200}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute right-2 top-2 rounded-full p-1 shadow-md"
                      >
                        <Pencil className="size-5 font-extrabold text-primary" />
                      </Button>
                    </div>
                  ) : (
                    <div className="cursor-pointer">
                      <CloudUpload className="mx-auto h-10 w-10 text-primary" />
                      <p>Drag & drop your logo here</p>
                      <p className="text-sm">or</p>
                      <Button variant="outline" className="mt-2">
                        Upload Logo
                      </Button>
                    </div>
                  )}
                </FileUploader>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prefix">Secret Code Prefix</Label>
              <Input
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="e.g., NRG, TSM, FAZE"
              />
              <p className="text-sm text-muted-foreground">
                (Optional): Add a short prefix to personalize your team code.
              </p>
            </div>

            {/* <pre className="text-red-500">
              {JSON.stringify(errors, null, 2)}
            </pre> */}

            <Button
              type="submit"
              className="w-full"
              disabled={
                loading ||
                !form.watch("name") ||
                !form.watch("gameId") ||
                !image
              }
            >
              {loading ? "Creating..." : "Create Team"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default TeamForm;
