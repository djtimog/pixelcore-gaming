"use client";
import {
  Check,
  LoaderCircle,
} from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReferItemProps } from "@/lib/placeholder-data";
import { refersData } from "@/lib/data";
import { RefersCard } from "@/components/ui/dashboard/card/refer";

const RefersItem = ({
  name,
  description,
  Icon,
  ActionIcon,
  action,
}: ReferItemProps) => {
  const [iconState, setIconState] = useState<"default" | "loading" | "done">(
    "default",
  );

  const handleClick = async () => {
    setIconState("loading");
    await action();
    setIconState("done");
    setTimeout(() => setIconState("default"), 2000);
  };

  const getCurrentIcon = () => {
    if (iconState === "loading") return LoaderCircle;
    if (iconState === "done") return Check;
    return ActionIcon;
  };

  return (
    <RefersCard
      name={name}
      description={description}
      Icon={Icon}
      ActionIcon={getCurrentIcon()}
      onClick={handleClick}
    />
  );
};


export default function Refers() {
  return (
    <Card className="min-h-screen border-0 bg-inherit">
      <CardHeader>
        <CardTitle className="outlined-text truncate text-center text-2xl tracking-wide">
          Invite Your Friends
        </CardTitle>
        <CardDescription className="flex flex-col items-center justify-evenly gap-6 pt-8 sm:flex-row">
          {refersData.map((data) => (
            <RefersItem key={data.name} {...data} />
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4"></CardContent>
    </Card>
  );
}
