"use client";

import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { onSubmitForm } from "@/lib/action/_onSubmit-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  tournamentId: number;
  refresh: () => void;
};

type AnnouncementFormData = {
  title: string;
  content: string;
};

export function CreateAnnouncementDialog({ tournamentId, refresh }: Props) {
  const { register, handleSubmit, reset } = useForm<AnnouncementFormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: AnnouncementFormData) => {
    setLoading(true);
    const announcementData = {
      tournamentId: tournamentId,
      ...data,
    };
    await onSubmitForm.Announcement(announcementData, router);
    setLoading(false);
    reset();
    refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <Input placeholder="Title" {...register("title")} required />
          <Textarea
            rows={4}
            placeholder="Write the announcement..."
            {...register("content")}
          />
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
