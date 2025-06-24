"use client";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"; // Make sure this path is correct
import { useRouter } from "next/navigation";
import { useDbUser } from "../context/DbUserProvider";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { onSubmitForm } from "@/lib/action/_onSubmit-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Rating } from "@mui/material";
import { Textarea } from "@/components/ui/textarea";
import { styled } from "@mui/material/styles";

type FeedbackFormData = {
  rating: number;
  comments: string;
};

export const CustomRating = styled(Rating)({
  color: "#14C570", // fallback color
  "& .MuiRating-iconFilled": {
    color: "#14C570", // active stars
  },
  "& .MuiRating-iconHover": {
    color: "#14C570", // hovered stars
  },
  "& .MuiRating-iconEmpty": {
    color: "#14C570", // gray-300 for outlined/inactive stars
  },
});

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
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Give Feedback
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-secondary px-4 py-6">
        <DrawerHeader>
          <DrawerTitle>Give Tournament Feedback</DrawerTitle>
          <DrawerDescription>
            Let others know what you thought.
          </DrawerDescription>
        </DrawerHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 px-4 pb-6"
        >
          <div className="grid gap-2">
            <Label>Rating</Label>
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <CustomRating
                  name="rating"
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  size="large"
                />
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              rows={3}
              placeholder="What did you think?"
              {...register("comments")}
            />
          </div>

          <DrawerFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Feedback"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
