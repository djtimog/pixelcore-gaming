"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import { KeyRound, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";
import { Button } from "../../button";
import { Input } from "../../input";
import { useRouter } from "next/navigation";

function NoTeamPage() {
  const router = useRouter();
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [secretCode, setSecretCode] = useState("");

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
    </div>
  );
}

export default NoTeamPage;
