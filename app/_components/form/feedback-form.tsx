"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { onSubmitForm } from "@/lib/action/_onSubmit-form";
import { useDbUser } from "../context/DbUserProvider";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

// Feedback form type
type FeedbackFormData = {
  rating: number;
  comments: string;
};

export function FeedBackForm({ tournamentId }: { tournamentId: number }) {
  const { player } = useDbUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { control, register, handleSubmit, reset } = useForm<FeedbackFormData>({
    defaultValues: {
      rating: 0,
      comments: "",
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setIsLoading(true);
    const feedbackData = {
      tournamentId: tournamentId,
      playerId: player?.id || 0,
      ...data,
    };
    await onSubmitForm.Feedback(feedbackData, router);
    setIsLoading(false);
    router.refresh();
    reset();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Give Feedback</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-secondary">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none">Tournament Feedback</h4>
            <p className="text-sm text-muted-foreground">
              Share your thoughts about the tournament.
            </p>
          </div>

          <div className="z-50 grid gap-2">
            <Label>Rating</Label>
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <div className="flex gap-1">
                  <Rating
                    className="text-inherit"
                    name="simple-controlled"
                    value={field.value}
                    defaultValue={3}
                    size="large"
                    onChange={(_, newValue) => field.onChange(newValue)}
                  />
                </div>
              )}
            />

            <div className="grid gap-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                rows={3}
                placeholder="What did you think?"
                {...register("comments")}
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
