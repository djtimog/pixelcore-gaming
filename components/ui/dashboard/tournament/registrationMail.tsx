"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../button";
import {
  Mail,
  CheckCircle,
  XCircle,
  Users,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Filter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { RegistrationEntry, Team } from "@/lib/placeholder-data";
import { Get } from "@/lib/action/_get";
import { Delete, Update } from "@/lib/action/_post";
import { toast } from "@/hooks/use-toast";

export default function RegistrationMail({
  registrations,
}: {
  registrations: RegistrationEntry[];
}) {
  const [open, setOpen] = useState(false);
  const [showAccepted, setShowAccepted] = useState(true);
  const [showPending, setShowPending] = useState(true);
  const [teamsData, setTeamsData] = useState<Record<number, Team>>({});
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [localRegistrations, setLocalRegistrations] =
    useState<RegistrationEntry[]>(registrations);

  const accepted = localRegistrations.filter((r) => r.isAccepted);
  const pending = localRegistrations.filter((r) => !r.isAccepted);

  const total = pending.length;
  const countDisplay = total > 10 ? "10+" : total;

  useEffect(() => {
    async function fetchTeamsData() {
      try {
        setLoadingTeams(true);
        const results = await Promise.all(
          registrations.map(async (reg) => {
            const team = await Get.TeamById(reg.teamId);
            return [reg.teamId, team] as [number, Team];
          }),
        );

        const teamMap: Record<number, Team> = Object.fromEntries(results);
        setTeamsData(teamMap);
      } catch (error) {
        console.error("Error fetching team data:", error);
        toast({
          title: "Error",
          description: "Failed to load team details.",
          variant: "destructive",
        });
      } finally {
        setLoadingTeams(false);
      }
    }

    if (registrations.length > 0) {
      fetchTeamsData();
    }
  }, [registrations]);

  const onAccept = async (regId: number) => {
    const isAccepted = true;
    try {
      await Update.TeamRegistrationWithStatus(regId, isAccepted);
      setLocalRegistrations((prev) =>
        prev.map((r) => (r.id === regId ? { ...r, isAccepted: true } : r)),
      );
      toast({
        title: "Registration accepted",
        description: "Team registration has been approved.",
      });
    } catch (error) {
      console.error("Error accepting team registration:", error);
      toast({
        title: "Action failed",
        description: "Could not accept registration. Try again.",
        variant: "destructive",
      });
    }
  };

  const onReject = async (regId: number) => {
    try {
      await Delete.TeamRegistration(regId);
      setLocalRegistrations((prev) => prev.filter((r) => r.id !== regId));
      toast({
        title: "Registration removed",
        description: "Team registration has been rejected and removed.",
      });
    } catch (error) {
      console.error("Error rejecting team registration:", error);
      toast({
        title: "Action failed",
        description: "Could not reject registration. Try again.",
        variant: "destructive",
      });
    }
  };

  const registrationList = [
    {
      id: 1,
      lists: pending,
      checked: showPending,
      setChecked: setShowPending,
      label: "Pending Teams",
      icon: XCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/50",
      badgeText: "Pending",
      badgeColor:
        "bg-yellow-500/20 dark:bg-yellow-100 text-yellow-700 cursor-default",
      actions: true,
    },
    {
      id: 2,
      lists: accepted,
      checked: showAccepted,
      setChecked: setShowAccepted,
      label: "Accepted Teams",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/50",
      badgeText: "Accepted",
      badgeColor:
        "bg-green-500/20 dark:bg-green-100 text-green-700 cursor-default",
      actions: false,
    },
  ];

  const noFilterSelected = !showAccepted && !showPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="relative">
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Mail size={18} className="text-muted-foreground" />
            {total > 0 && (
              <span className="absolute -right-1 -top-1 z-10 rounded-full bg-red-500 px-1.5 text-[10px] font-medium text-white">
                {countDisplay}
              </span>
            )}
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Users size={18} /> Team Registrations
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto flex items-center"
                >
                  <Filter className="mr-1 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {registrationList.map((registration) => (
                  <DropdownMenuCheckboxItem
                    key={registration.id}
                    checked={registration.checked}
                    onCheckedChange={registration.setChecked}
                    className="capitalize"
                  >
                    {registration.badgeText}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogTitle>
        </DialogHeader>

        {loadingTeams ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            Loading teams data...
          </div>
        ) : localRegistrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Mail size={36} className="mb-2 text-muted-foreground/70" />
            <p className="font-medium">No registrations yet</p>
            <p className="text-sm">
              You&apos;ll see team registrations here once they arrive.
            </p>
          </div>
        ) : noFilterSelected ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <Filter size={36} className="mb-2 text-muted-foreground/70" />
            <p className="font-medium">No filter selected</p>
            <p className="text-sm">Enable a filter to view registrations.</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[400px] pr-2">
            {registrationList.map(
              (registration, index) =>
                registration.checked &&
                registration.lists.length > 0 && (
                  <div key={registration.id}>
                    <h3
                      className={`mb-2 flex items-center gap-1 text-sm font-semibold ${registration.color}`}
                    >
                      <registration.icon size={14} /> {registration.label}
                    </h3>

                    <ul className="space-y-2">
                      {registration.lists.map((reg) => {
                        const team = teamsData[reg.teamId];
                        return (
                          <li
                            key={reg.id}
                            className={`flex flex-col gap-2 rounded-lg border ${registration.bgColor} p-3 shadow-sm`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">
                                    {team?.name || "Unknown Team"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Registered{" "}
                                    {new Date(
                                      reg.registeredAt || Date.now(),
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant="secondary"
                                className={registration.badgeColor}
                              >
                                {registration.badgeText}
                              </Badge>
                            </div>

                            {registration.actions && (
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30"
                                  onClick={() => onAccept(reg.id)}
                                >
                                  <ThumbsUp size={14} className="mr-1" /> Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                                  onClick={() => onReject(reg.id)}
                                >
                                  <ThumbsDown size={14} className="mr-1" />{" "}
                                  Reject
                                </Button>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    {index === 0 &&
                      accepted.length > 0 &&
                      pending.length > 0 &&
                      showAccepted &&
                      showPending && <Separator className="my-4" />}
                  </div>
                ),
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
