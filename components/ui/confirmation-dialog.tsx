import React, { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  triggerText: string;
  triggerIcon?: ReactNode;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
}

export const ConfirmationButton: React.FC<ConfirmationDialogProps> = ({
  title,
  description,
  onConfirm,
  triggerText,
  triggerIcon,
  className,
  variant,
  size,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn(className)} variant={variant} size={size}>
          {triggerIcon}
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
