"use client";

import * as React from "react";
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Globe } from "lucide-react";
import { format } from "date-fns";
import { DateRange, Matcher } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Label } from "./label";
import { Input } from "./input";

interface Props {
  date: DateRange | undefined;
  setDate: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: Matcher | Matcher[];
}

export function DateRangePicker({
  date,
  setDate,
  placeholder,
  disabled,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder || "Pick a date range"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          disabled={disabled} // 👈 pass down the disabled prop
        />
      </PopoverContent>
    </Popover>
  );
}

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: Matcher | Matcher[];
}

export function DatePicker({
  date,
  setDate,
  placeholder,
  disabled,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder || "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}

const timezones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Asia/Tokyo",
  "Asia/Manila",
  "Australia/Sydney",
];

export const TimeWithTimezonePicker = ({
  time,
  timezone,
  onTimeChange,
  onTimezoneChange,
}: {
  time: string;
  timezone: string;
  onTimeChange: (time: string) => void;
  onTimezoneChange: (tz: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>
            {time || "Select time"} — {timezone || "Select timezone"}
          </span>

          <Clock className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-4">
        <div className="space-y-2">
          <Label>Time</Label>
          <Input
            type="time"
            value={time ?? ""}
            onChange={(e) => onTimeChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Timezone</Label>
          <div className="grid gap-2">
            {timezones.map((tz) => (
              <Button
                key={tz}
                variant={tz === (timezone ?? "") ? "default" : "ghost"}
                onClick={() => {
                  onTimezoneChange(tz);
                  setOpen(false);
                }}
                className="justify-start"
              >
                <Globe className="mr-2 h-4 w-4" />
                {tz}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
