"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";

type RegistrationEntry = { 
  id: number; 
  teamId: number; 
  teamName: string; 
  isAccepted: boolean; 
  registeredAt: string; 
};

export default function TournamentRegistrationsPage() {
  const { uid } = useParams();
  const [registrations, setRegistrations] = useState<RegistrationEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const fetchRegs = async () => {
      try {
        const regs = await Get.TeamRegistrationsByTournament(uid as string);
        // Suppose this now returns teamName + registrationId
        setRegistrations(
          regs.sort(
            (a, b) =>
              new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
          )
        );
      } catch (err) {
        console.error("Error fetching registrations:", err);
        toast({
          title: "Error",
          description: "Could not load registrations.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRegs();
  }, [uid]);

  if (loading) {
    return <div className="mt-10 text-center">Loading registrations...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-6">Team Registrations</h2>
      {registrations.length > 0 ? (
        <div className="space-y-4">
          {registrations.map((reg) => (
            <Card key={reg.id} className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{reg.teamName}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(reg.registeredAt).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm">
                  {reg.isAccepted ? (
                    <Badge variant="success">Accepted</Badge>
                  ) : (
                    <Badge variant="warning">Pending</Badge>
                  )}
                </span>
                <div className="flex gap-2">
                  {!reg.isAccepted && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={async () => {
                        try {
                          await Get.AcceptRegistration(reg.id);
                          setRegistrations((prev) =>
                            prev.map((r) =>
                              r.id === reg.id ? { ...r, isAccepted: true } : r
                            )
                          );
                          toast({
                            title: "Accepted",
                            description: `${reg.teamName} has been accepted.`,
                          });
                        } catch {
                          toast({
                            title: "Error",
                            description: "Could not accept registration.",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      Accept
                    </Button>
                  )}
                  {!reg.isAccepted && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        try {
                          await Get.DeclineRegistration(reg.id);
                          setRegistrations((prev) => prev.filter((r) => r.id !== reg.id));
                          toast({
                            title: "Declined",
                            description: `${reg.teamName} has been declined.`,
                          });
                        } catch {
                          toast({
                            title: "Error",
                            description: "Could not decline registration.",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      Decline
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No teams have registered yet.
        </p>
      )}
    </div>
  );
}
