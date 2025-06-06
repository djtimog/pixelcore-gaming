"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import Link from "next/link";
import { Megaphone } from "lucide-react";

type Announcement = {
  id: number;
  title: string;
  content: string;
  postedAt: string;
};

export default function TournamentAnnouncementsPage() {
  const { uid } = useParams();
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const fetchAnnouncements = async () => {
      try {
        const ann = await Get.AnnouncementsByTournament(uid as string);
        setAnnouncements(
          ann.sort(
            (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
          )
        );
      } catch (err) {
        console.error("Error fetching announcements:", err);
        toast({
          title: "Error",
          description: "Could not load announcements.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [uid]);

  if (loading) {
    return <div className="mt-10 text-center">Loading announcements...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Megaphone size={24} /> Tournament Announcements
        </h2>
        <Link href={`/dashboard/tournaments/${uid}/announcements/new`}>
          <Button variant="default">New Announcement</Button>
        </Link>
      </div>

      {announcements.length > 0 ? (
        <div className="space-y-4">
          {announcements.map((ann) => (
            <Card key={ann.id} className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{ann.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(ann.postedAt).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{ann.content}</p>
                <div className="mt-4 flex justify-end gap-2">
                  <Link href={`/dashboard/tournaments/${uid}/announcements/${ann.id}`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      try {
                        await Get.DeleteAnnouncement(ann.id);
                        setAnnouncements((prev) => prev.filter((a) => a.id !== ann.id));
                        toast({
                          title: "Deleted",
                          description: "Announcement has been deleted.",
                        });
                      } catch {
                        toast({
                          title: "Error",
                          description: "Could not delete announcement.",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No announcements have been posted yet.
        </p>
      )}
    </div>
  );
}
