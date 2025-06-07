"use client";

import { useEffect, useState } from "react";
import { Get } from "@/lib/action/_get";
import { FeedbackEntry } from "@/lib/placeholder-data";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "../../button";
import { Skeleton } from "../../skeleton";
import { DbTournamentDataType } from "@/lib/placeholder-data";
import FeedbackCard from "../card/feedback";
import { FeedBackForm } from "@/app/_components/form/feedback-form";
import { Rating } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "../../scroll-area";

export default function FeedbackSummary({
  tournamentData,
}: {
  tournamentData: DbTournamentDataType;
}) {
  const [feedback, setFeedback] = useState<FeedbackEntry[] | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      const data = await Get.FeedbackByTournamentId(tournamentData.id);
      setFeedback(data);
    };

    fetchFeedback();
  }, [tournamentData.id]);

  const avgRating =
    feedback && feedback.length > 0
      ? +(
          feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length
        ).toFixed(1)
      : null;

  const filterFeedback = feedback
    ?.reverse()
    ?.filter((f) => (f.rating >= 1 && f.rating <= 5) || true)
    .slice(0, 1)
    .map((f) => ({
      ...f,
      rating: f.rating < 1 || f.rating > 5 ? 5 : f.rating,
    }));

  return (
    <div>
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-2">
          <Star size={20} />
          <p className="text-sm font-bold">Average Rating:</p>
        </div>

        {avgRating !== null ? (
          <div className="flex items-center gap-3">
            <Rating
              name="read-only"
              value={avgRating}
              readOnly
              size="large"
              precision={0.1}
            />
            <p className="space-x-1 text-sm text-muted-foreground">
              {avgRating} / 5
            </p>
          </div>
        ) : (
          <p className="text-md font-semibold">No Ratings Yet</p>
        )}
      </div>

      <div className="space-y-5 rounded-lg border p-4 shadow-sm md:p-6">
        {feedback === null ? (
          <div className="space-y-3">
            <Skeleton className="h-16 w-full rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>
        ) : feedback.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Latest Feedback</p>
              <AllFeedback
                tournamentDataId={tournamentData.id}
                feedback={feedback}
              />
            </div>
            {feedback.length > 1 &&
              filterFeedback?.map((feedbackEntry) => (
                <FeedbackCard key={feedbackEntry.id} feedback={feedbackEntry} />
              ))}
          </div>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            No feedback submitted yet.
          </p>
        )}
        <FeedBackForm tournamentId={tournamentData.id} />
      </div>
    </div>
  );
}

export function AllFeedback({
  feedback,
  tournamentDataId,
}: {
  feedback: FeedbackEntry[];
  tournamentDataId: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>All Feedbacks</DialogTitle>
          <DialogDescription>
            Here you can view all feedback submitted for this tournament.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex h-[400px] w-full flex-col gap-3">
          <div className="flex flex-col gap-3 px-2">
            {feedback?.map((feedbackEntry) => (
              <FeedbackCard key={feedbackEntry.id} feedback={feedbackEntry} />
            ))}
          </div>
        </ScrollArea>
        <FeedBackForm tournamentId={tournamentDataId} />
      </DialogContent>
    </Dialog>
  );
}
