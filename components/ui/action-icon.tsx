"use client";
import React, { useState } from "react";
import { Check, LoaderCircle, LucideIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export const ActionIconButton = ({
  action,
  initialIcon,
  loadingIcon,
  finalIcon,
  className,
}: {
  action: () => Promise<void>;
  initialIcon: LucideIcon;
  loadingIcon?: LucideIcon;
  finalIcon?: LucideIcon;
  className?: string;
}) => {
  const [iconState, setIconState] = useState<"initail" | "loading" | "final">();

  const handleClick = async () => {
    setIconState("loading");
    await action();

    setIconState("final");
    setTimeout(() => setIconState("initail"), 2000);
  };

  const getCurrentIcon = () => {
    if (iconState === "loading") return loadingIcon || LoaderCircle;
    if (iconState === "final") return finalIcon || Check;
    return initialIcon;
  };

  const ActionIcon = getCurrentIcon();

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        `${iconState === "loading" ? "rotate-180 repeat-infinite" : ""}`,
        className,
      )}
      onClick={handleClick}
    >
      <ActionIcon />
    </Button>
  );
};
