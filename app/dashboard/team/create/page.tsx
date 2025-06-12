"use client";

import TeamCreateProvider, {
  useTeamCreate,
} from "@/app/_components/provider/team-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Copy, Share } from "lucide-react";

function CreateTeamForm() {
  const { teamCode, openDialog } = useTeamCreate();

  const handleCopy = () => {
    navigator.clipboard.writeText(teamCode);
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

      <Dialog open={openDialog}>
        <DialogContent className="text-center">
          <DialogClose disabled>x</DialogClose>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              🎉 Team Created Successfully!
            </DialogTitle>
          </DialogHeader>

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
                  <Copy className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Share this code with your teammates so they can join the team.
          </p>
        </DialogContent>
      </Dialog>
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
