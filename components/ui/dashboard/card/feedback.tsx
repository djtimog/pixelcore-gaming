"use client";

import { Get } from "@/lib/action/_get";
import { FeedbackEntry } from "@/lib/placeholder-data";
import { UserAvatar } from "../../avatar";
import { useEffect, useState } from "react";
import {
  PlayerProfile,
  UserProfile,
} from "@/app/_components/context/DbUserProvider";
import { format } from "date-fns";

export default function FeedbackCard({
  feedback,
}: {
  feedback: FeedbackEntry;
}) {
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      const p = await Get.PlayerById(feedback.playerId);
      if (p) {
        setPlayer(p);
        const u = await Get.UserById(p.userId);
        setUser(u);
      }
    };

    fetchPlayerData();
  }, [feedback.playerId]);

  return (
    <div className="relative rounded-md border p-2 shadow-sm">
      <div className="mb-2 flex gap-1 text-lg text-yellow-500">
        {"★".repeat(feedback.rating)}
        {"☆".repeat(5 - feedback.rating)}
      </div>

      <div className="mb-1 flex-1">
        <p className="text-sm text-muted-foreground">
          {feedback.comments || "No comments provided"}
        </p>
      </div>

      <p className="absolute right-1 top-1 text-xs text-muted-foreground">
        {feedback.submittedAt
          ? format(new Date(feedback.submittedAt), "PPP")
          : ""}
      </p>

      <div className="flex items-center gap-2">
        <UserAvatar
          name={`${player?.gameHandle}`}
          url={`${user?.imageUrl}`}
          alt={`${player?.gameHandle} avatar`}
        />
        <div>
          <p className="text-sm font-medium">
            {player?.gameHandle || "Anonymous"}
          </p>
        </div>
      </div>
    </div>
  );
}
