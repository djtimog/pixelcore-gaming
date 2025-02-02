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
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  description,
  onConfirm,
  triggerText,
  triggerIcon,
  className,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn(className)}>
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
