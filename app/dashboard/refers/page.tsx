import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function Refers() {
  return (
    <Card className={"min-h-screen border-0 bg-inherit"}>
      <CardHeader>
        <CardTitle className="outlined-text truncate text-center text-2xl tracking-wide">
          Invite Your Friends
        </CardTitle>
        <CardDescription className="flex justify-evenly items-center gap-3 pt-8">
            <Button>Copy Code</Button>
            <Button>Copy Link</Button>
            <Button>Share</Button>
            {/* complete later */}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4"></CardContent>
    </Card>
  );
}
