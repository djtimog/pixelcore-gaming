"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RequirementCard } from "@/components/ui/dashboard/requirement-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, CloudUpload, Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";

export function HostMatchForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tournamentName: "",
    date: "",
    time: "",
    round: "",
    maxPlayers: "",
    image: null,
    description: "",
  });
  const [registrationRange, setRegistrationRange] = useState<
    DateRange | undefined
  >(undefined);
  const [tournamentDate, setTournamentDate] = useState<Date | undefined>(
    undefined,
  );

  const fileTypes = ["JPG", "PNG", "GIF"];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const isCurrentStepValid = () => {
    if (step === 1)
      return (
        formData.tournamentName.trim() !== "" &&
        formData.image &&
        formData.description.trim() !== ""
      );
    if (step === 2) return formData.date && formData.time;
    if (step === 3) return formData.round && formData.maxPlayers;
    return true;
  };

  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle className="text-xl text-primary">
          Host Match - Step {step}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Upload Game Image</Label>
              <div
                className={`flex items-center justify-center rounded-md text-center text-gray-500 ${formData.image ? "border border-primary" : "border-2 border-dashed"}`}
              >
                <FileUploader
                  name="file"
                  types={fileTypes}
                  handleChange={handleFileChange}
                  classes="w-full h-full flex items-center justify-center p-5"
                >
                  {formData.image ? (
                    <div className="relative w-full overflow-hidden">
                      <Image
                        src={URL.createObjectURL(formData.image)}
                        alt="Uploaded Preview"
                        className="h-48 w-full rounded-md object-cover"
                        width={200}
                        height={200}
                      />
                      <Button
                        size={"icon"}
                        variant="ghost"
                        className="absolute right-2 top-2 rounded-full p-1 shadow-md"
                      >
                        <Pencil className="size-5 font-extrabold text-primary" />
                      </Button>
                    </div>
                  ) : (
                    <div className="cursor-pointer">
                      <CloudUpload className="mx-auto h-10 w-10 text-primary" />
                      <p>Drag & drop your game image here</p>
                      <p className="text-sm">or</p>
                      <Button variant="outline" className="mt-2">
                        Upload Image
                      </Button>
                    </div>
                  )}
                </FileUploader>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tournamentName">Tournament Name</Label>
              <Input
                id="tournamentName"
                value={formData.tournamentName}
                onChange={handleChange}
                placeholder="Enter Tournament name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Game Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the match or game here..."
                rows={4}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Registration Period</Label>
              <DateRangePicker
                date={registrationRange}
                setDate={setRegistrationRange}
                placeholder="Select registration period"
              />
            </div>
            <div>
              <Label>Tournament Start Date</Label>
              <DatePicker
                date={tournamentDate}
                setDate={setTournamentDate}
                placeholder="Select tournament date"
              />
            </div>
            <Label htmlFor="time">Match Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Label htmlFor="round">Match Round</Label>
            <Input
              id="round"
              value={formData.round}
              onChange={handleChange}
              placeholder="e.g. Quarter-finals"
            />
            <Label htmlFor="maxPlayers">Max Players Per Team</Label>
            <Input
              id="maxPlayers"
              type="number"
              value={formData.maxPlayers}
              onChange={handleChange}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Match Details</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <strong>Game:</strong> {formData.game}
              </li>
              <li>
                <strong>Description:</strong> {formData.description}
              </li>
              <li>
                <strong>Date:</strong> {formData.date}
              </li>
              <li>
                <strong>Time:</strong> {formData.time}
              </li>
              <li>
                <strong>Round:</strong> {formData.round}
              </li>
              <li>
                <strong>Max Players:</strong> {formData.maxPlayers}
              </li>
            </ul>
          </div>
        )}

        <div className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button onClick={handleNext} disabled={!isCurrentStepValid()}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="bg-primary text-white">
              Submit Match
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Schedule() {
  const referrals = 11;
  const isVerified = true;
  const hasNoBans = true;
  const profileCompleted = true;

  const requirements = [
    {
      text: "You must have at least 10 referrals",
      met: referrals >= 10,
      fixLink: "/invite-friends",
    },
    {
      text: "Your account must be verified",
      met: isVerified,
      fixLink: "/verify-account",
    },
    {
      text: "No active bans on your account",
      met: hasNoBans,
    },
    {
      text: "Complete your profile",
      met: profileCompleted,
      fixLink: "/complete-profile",
    },
  ];

  const isEligible = requirements.every((req) => req.met);

  return (
    <div className="mx-auto mt-10 max-w-3xl p-4">
      {!isEligible ? (
        <RequirementCard
          title="Not Eligible to Host"
          details="You need to meet the following requirements:"
          buttonText="Cannot Host Match"
          requirements={requirements}
        />
      ) : (
        <HostMatchForm />
      )}
    </div>
  );
}
