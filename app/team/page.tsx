"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ProfileCard } from "@/components/ui/profile-card";
import Image from "next/image";
import teamImage from "@/public/team-image.png";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { teams } from "@/lib/data";

export default function Team() {
  const [selectedGame, setSelectedGame] = useState("Call of Duty");

  const handleGameChange = (event: SelectChangeEvent) => {
    setSelectedGame(event.target.value);
  };

  return (
    <section className="min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Select
            labelId="select-team-label"
            id="select-team"
            value={selectedGame}
            onChange={handleGameChange}
            className="bg-inherit text-inherit rounded-md shadow-md w-64 sticky top-0"
          >
            {teams.map((team) => (
              <MenuItem 
                value={team.game} 
                key={team.game}
                className="flex justify-between items-center text-lg">
                {team.game} <span className="text-sm text-gray-500">({team.name})</span>
              </MenuItem>
            ))}
          </Select>
        </div>
      <section className="px-6 py-8">
        <h1 className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-center font-bold mb-10">
            {teams
            .filter((team) => team.game === selectedGame)
            .map((team) => team.name)
            .join(", ")}
        </h1>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teams
            .filter((team) => team.game === selectedGame)
            .flatMap((team) => team.team)
            .map((filteredTeam, index) => (
              <ProfileCard key={index} profile={filteredTeam} />
            ))}
        </div>
      </section>

      <section>
        <div className="relative overflow-hidden bg-white">
          <div className="py-5 sm:py-0 max-h-[25rem]">
            <Image
              src={teamImage}
              alt="team image"
              className="object-cover w-full z-0"
            />
          </div>
          <div className="absolute top-0 bg-black w-full h-full bg-opacity-50 flex justify-center sm:justify-start items-center px-5">
            <div className="text-center sm:text-start p-5 sm:px-11 space-y-2 sm:space-y-5 md:space-y-7 sm:w-2/3 md:w-1/2 xl:1/3">
              <h6 className="text-[#14C570] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Team Core
              </h6>
              <h4 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl md:font-semibold">
                Join with our team and family
              </h4>

              <div className="flex justify-center sm:justify-start md:pt-10">
                <Link href="/events">
                  <button
                    className="bg-[#14C570] flex normal-case space-x-2 hover:space-x-4 text-lg p-2 rounded"
                  >
                    <span>Join Us</span>
                    <ArrowForwardIcon className="" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
