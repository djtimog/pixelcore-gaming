'use client'
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";

type ScheduleFormData = {
  eventName: string;
  gameTitle: string;
  modeType: string;
  dateTime: string;
  location: string;
  organizerName: string;
  contactEmail: string;
  contactPhone: string;
  additionalNotes: string;
};

const ScheduleForm: React.FC = () => {
  const [formData, setFormData] = useState<ScheduleFormData>({
    eventName: "",
    gameTitle: "",
    modeType: "",
    dateTime: "",
    location: "",
    organizerName: "",
    contactEmail: "",
    contactPhone: "",
    additionalNotes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: keyof ScheduleFormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Schedule Form Data Submitted:", formData);
  };

  return (
    <Card className="p-4 max-w-4xl mx-auto">
      <CardContent>
        <h1 className="text-2xl font-bold mb-4">Schedule an Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Event Name"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
            />
            <Select
              required
              onValueChange={(value) => handleSelectChange("gameTitle", value)}
            >
              <SelectContent>
                <SelectItem value="CODM">CODM</SelectItem>
                <SelectItem value="Fortnite">Fortnite</SelectItem>
                <SelectItem value="PUBG">PUBG</SelectItem>
              </SelectContent>
            </Select>
            <Select
              required
              onValueChange={(value) => handleSelectChange("modeType", value)}
            >
              <SelectContent>
                <SelectItem value="MP">Multiplayer (MP)</SelectItem>
                <SelectItem value="BR">Battle Royale (BR)</SelectItem>
                <SelectItem value="Solo">Solo</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <h2 className="text-xl font-bold mt-6">Organizer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              type="text"
              placeholder="Organizer Name"
              name="organizerName"
              value={formData.organizerName}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="Contact Email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              placeholder="Contact Phone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>

          <h2 className="text-xl font-bold mt-6">Additional Details</h2>
          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Additional Notes (optional)"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="mt-6 w-full">
            Submit Schedule
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScheduleForm;
