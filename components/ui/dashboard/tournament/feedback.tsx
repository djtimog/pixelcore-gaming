"use client";

import { useEffect, useState } from "react";
import { Get } from "@/lib/action/_get";
import { FeedbackEntry } from "@/lib/placeholder-data";
import { ArrowRight, RefreshCw, Star } from "lucide-react";
import { Button } from "../../button";
import { Skeleton } from "../../skeleton";
import { DbTournamentDataType } from "@/lib/placeholder-data";
import FeedbackCard from "../card/feedback";
import {
  CustomRating,
  FeedBackForm,
} from "@/app/_components/form/feedback-form";
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
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const data = await Get.FeedbackByTournamentId(tournamentData.id);

      if (data && data.length > 0) {
        const avgRating = parseFloat(
          (data.reduce((sum, f) => sum + f.rating, 0) / data.length).toFixed(1),
        );
        setAvgRating(avgRating);

        setFeedback([...data].reverse());
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [tournamentData.id]);

  return (
    <div>
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-2">
          <Star size={20} />
          <p className="text-sm font-bold">Average Rating:</p>
        </div>

        {avgRating !== null ? (
          <div className="flex items-center gap-3">
            <CustomRating
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
              <div className="flex items-center gap-1">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className={`${loading ? "rotate-360 duration-1500 repeat-infinite" : ""}`}
                  onClick={fetchFeedback}
                >
                  <RefreshCw />
                </Button>
                {feedback.length > 1 && (
                  <AllFeedback
                    tournamentDataId={tournamentData.id}
                    feedback={feedback}
                    loading={loading}
                    refreshFeedback={fetchFeedback}
                  />
                )}
              </div>
            </div>
            {feedback.length > 0 && <FeedbackCard feedback={feedback[0]} />}
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
  loading,
  refreshFeedback,
}: {
  feedback: FeedbackEntry[];
  tournamentDataId: number;
  loading: boolean;
  refreshFeedback: () => Promise<void>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Button
          size={"icon"}
          variant={"ghost"}
          className={`absolute right-10 top-1 ${loading ? "rotate-360 duration-1500 repeat-infinite" : ""}`}
          onClick={refreshFeedback}
        >
          <RefreshCw />
        </Button>
        <DialogHeader>
          <DialogTitle>All Feedbacks</DialogTitle>
          <DialogDescription>
            Here you can view all feedback submitted for this tournament.
          </DialogDescription>
        </DialogHeader>
        <FeedBackForm tournamentId={tournamentDataId} />
        <ScrollArea className="flex h-[400px] w-full flex-col gap-3">
          <div className="flex flex-col gap-3 px-2">
            {feedback?.map((feedbackEntry) => (
              <FeedbackCard key={feedbackEntry.id} feedback={feedbackEntry} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
