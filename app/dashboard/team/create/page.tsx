"use client";

import TeamCreateProvider, {
  useTeamCreate,
} from "@/app/_components/provider/team-provider";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check, Copy, LoaderCircle, Share } from "lucide-react";
import TeamForm from "@/app/_components/form/team-form";
import { useRouter } from "next/navigation";
import { handleShare } from "@/lib/share";
import { useState } from "react";

function CreateTeamForm() {
  const { teamCode, openDialog } = useTeamCreate();
  const router = useRouter();

  const [iconState, setIconState] = useState<"default" | "loading" | "done">(
    "default",
  );

  const getCurrentIcon = () => {
    if (iconState === "loading") return LoaderCircle;
    else if (iconState === "done") return Check;
    else return Copy;
  };
  const ActionIcon = getCurrentIcon();

  const handleCopy = () => {
    setIconState("loading");
    navigator.clipboard.writeText(teamCode);
    setIconState("done");
    setTimeout(() => setIconState("default"), 2000);
  };

  const shareData = {
    title: "Join Our Esports Team!",
    text: `Use this secret code to join our team: ${teamCode}`,
    url: `https://pixelcore-gaming.vercel.app/dashboard/team?secretCode=${teamCode}`,
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="outlined-text text-3xl tracking-wide">
          Create Your Esports Team
        </h2>
        <p className="mt-2 text-muted-foreground">
          Fill in the details below to start your journey with your squad!
        </p>
      </div>

      <TeamForm />

      <AlertDialog open={openDialog}>
        <AlertDialogContent className="text-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl font-semibold">
              🎉 Successfully Joined a TEAM
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription className="text-sm text-muted-foreground">
            Share this code with your teammates so they can join the team.
          </AlertDialogDescription>

          <div className="relative my-6 w-full rounded-md border border-muted bg-muted p-4 text-left">
            <Label className="mb-1 block text-sm text-muted-foreground">
              Team Secret Code
            </Label>
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-semibold">
                {teamCode}
              </span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={handleCopy}>
                  <ActionIcon className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleShare(shareData)}
                >
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => router.push("/dashboard/team")}
              className="flex w-full gap-2"
            >
              <ArrowLeft />
              <span>Go Back To Team</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function CreateTeamPage() {
  return (
    <TeamCreateProvider>
      <CreateTeamForm />
    </TeamCreateProvider>
  );
}
