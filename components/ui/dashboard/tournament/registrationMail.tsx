"use client";

import React, { useState } from "react";
import { Button } from "../../button";
import { Mail, CheckCircle, XCircle, Users } from "lucide-react";
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
import { RegistrationEntry } from "@/lib/placeholder-data";

export default function RegistrationMail({
  registrations,
}: {
  registrations: RegistrationEntry[];
}) {
  const [open, setOpen] = useState(false);

  const accepted = registrations.filter((r) => r.isAccepted);
  const pending = registrations.filter((r) => !r.isAccepted);

  const total = registrations.length;
  const countDisplay = total > 10 ? "10+" : total;

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
          <DialogTitle className="flex items-center gap-2">
            <Users size={18} /> Team Registrations
          </DialogTitle>
        </DialogHeader>

        {registrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Mail size={36} className="mb-2 text-muted-foreground/70" />
            <p className="font-medium">No registrations yet</p>
            <p className="text-sm">
              You’ll see team registrations here once they arrive.
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[400px] pr-2">
            {accepted.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-1 text-sm font-semibold text-green-600">
                  <CheckCircle size={14} /> Accepted Teams
                </h3>
                <ul className="space-y-2">
                  {accepted.map((reg) => (
                    <li
                      key={reg.id}
                      className="flex items-center justify-between rounded-lg border bg-green-50 p-3 shadow-sm"
                    >
                      {/* <div>
                        <p className="font-medium">{reg.teamName}</p>
                        <p className="text-xs text-muted-foreground">
                          Registered{" "}
                          {new Date(reg.registeredAt).toLocaleDateString()}
                        </p>
                      </div> */}
                      <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-700"
                      >
                        Accepted
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {accepted.length > 0 && pending.length > 0 && (
              <div className="my-4">
                <Separator />
              </div>
            )}

            {pending.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-1 text-sm font-semibold text-yellow-600">
                  <XCircle size={14} /> Pending Teams
                </h3>
                <ul className="space-y-2">
                  {pending.map((reg) => (
                    <li
                      key={reg.id}
                      className="flex items-center justify-between rounded-lg border bg-yellow-50 p-3 shadow-sm"
                    >
                      <div>
                        {/* <p className="font-medium">{reg.teamName}</p>
                        <p className="text-xs text-muted-foreground">
                          Registered{" "}
                          {new Date(reg.registeredAt).toLocaleDateString()}
                        </p> */}
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-500/20 text-yellow-700"
                      >
                        Pending
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
