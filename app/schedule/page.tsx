'use client';
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

type FormData = {
  tournamentName: string;
  gameTitle: string;
  modeType: string;
  region: string;
  dateTime: string;
  registrationDeadline: string;
  maxParticipants: string;
  platform: string;
  teamName: string;
  teamCaptain: string;
  playerIDs: string;
  email: string;
  phone: string;
  numberOfPlayers: string;
  mapPreference: string;
  customRules: string;
  entryFee: string;
  prizePool: string;
  streamLink: string;
  discordLink: string;
};

const TournamentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    tournamentName: "",
    gameTitle: "",
    modeType: "",
    region: "",
    dateTime: "",
    registrationDeadline: "",
    maxParticipants: "",
    platform: "",
    teamName: "",
    teamCaptain: "",
    playerIDs: "",
    email: "",
    phone: "",
    numberOfPlayers: "",
    mapPreference: "",
    customRules: "",
    entryFee: "",
    prizePool: "",
    streamLink: "",
    discordLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Card className="p-4 max-w-4xl mx-auto">
      <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
      <CardContent>
        <h1 className="text-2xl font-bold mb-4">Tournament Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Tournament Name"
              name="tournamentName"
              value={formData.tournamentName}
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
              type="text"
              placeholder="Region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            />
            <Input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
            />
            <Input
              type="datetime-local"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              placeholder="Max Participants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
            />
            <Select
              required
              onValueChange={(value) => handleSelectChange("platform", value)}
            >
              <SelectContent>
                <SelectItem value="PC">PC</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="Console">Console</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <h2 className="text-xl font-bold mt-6">Team/Player Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              type="text"
              placeholder="Team Name"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Team Captain"
              name="teamCaptain"
              value={formData.teamCaptain}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Player IDs (comma-separated)"
              name="playerIDs"
              value={formData.playerIDs}
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Number of Players"
              name="numberOfPlayers"
              value={formData.numberOfPlayers}
              onChange={handleChange}
            />
          </div>

          <h2 className="text-xl font-bold mt-6">Game-Specific Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              type="text"
              placeholder="Map Preference"
              name="mapPreference"
              value={formData.mapPreference}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Custom Rules (optional)"
              name="customRules"
              value={formData.customRules}
              onChange={handleChange}
            />
          </div>

          <h2 className="text-xl font-bold mt-6">Tournament Logistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              type="number"
              placeholder="Entry Fee (if any)"
              name="entryFee"
              value={formData.entryFee}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Prize Pool"
              name="prizePool"
              value={formData.prizePool}
              onChange={handleChange}
            />
            <Input
              type="url"
              placeholder="Stream Link (if available)"
              name="streamLink"
              value={formData.streamLink}
              onChange={handleChange}
            />
            <Input
              type="url"
              placeholder="Discord Link"
              name="discordLink"
              value={formData.discordLink}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="mt-6 w-full">
            Submit Registration
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TournamentForm;
