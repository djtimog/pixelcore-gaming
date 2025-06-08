"use client";

import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type TournamentAnnouncement = {
  title: string;
  content: string;
  postedAt: Date | null;
};

export default function AnnouncementCard({
  announcements,
}: {
  announcements: TournamentAnnouncement[];
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-md border p-3"
      defaultValue="item-1"
    >
      {announcements.map((announcement, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>
            <div className="">
              <h4 className="text-md mb-2 font-bold">
                {announcement.title.trim().charAt(0).toUpperCase() +
                  announcement.title.trim().slice(1)}
              </h4>
              {announcement.postedAt && (
                <p className="text-xs text-muted-foreground">
                  {format(new Date(announcement.postedAt), "hh:mmaaa dd/MM")}
                </p>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>{announcement.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
