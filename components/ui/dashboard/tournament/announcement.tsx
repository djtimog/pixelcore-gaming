"use client";

import { useEffect, useState } from "react";
import { Get } from "@/lib/action/_get";
import AnnouncementCard from "../card/announcement";
import { Skeleton } from "../../skeleton";
import { CreateAnnouncementDialog } from "@/app/_components/form/announcement-form";
import { Announcement } from "@/lib/placeholder-data";
import { Megaphone } from "lucide-react";

export default function AnnouncementSummary({
  tournamentId,
  isOrganizer,
}: {
  tournamentId: number;
  isOrganizer: boolean;
}) {
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null,
  );
  const fetchAnnouncements = async () => {
    const data = await Get.AnnouncementsByTournamentId(tournamentId);
    setAnnouncements(data.reverse());
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await Get.AnnouncementsByTournamentId(tournamentId);
      setAnnouncements(data.reverse());
    };

    fetchAnnouncements();
  }, [tournamentId]);

  return (
    <div className="space-y-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-lg font-semibold">
          <Megaphone size={18} /> Announcements
        </h4>
        {isOrganizer && (
          <CreateAnnouncementDialog
            tournamentId={tournamentId}
            refresh={fetchAnnouncements}
          />
        )}
      </div>

      {announcements === null ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
        </div>
      ) : announcements.length > 0 ? (
        <AnnouncementCard announcements={announcements} />
      ) : (
        <p className="text-sm italic text-muted-foreground">
          No announcements posted yet.
        </p>
      )}
    </div>
  );
}
