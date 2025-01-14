"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ProfileCard, TeamList } from "@/components/ui/profile-card";
import Image from "next/image";
import teamImage from "@/public/team-image.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import captain from "@/public/captain.png";

export default function Team() {
  const [selectedGame, setSelectedGame] = useState("Call of Duty");

  const handleGameChange = (event: SelectChangeEvent) => {
    setSelectedGame(event.target.value);
  };

  return (
    <main>
      <section className="px-11 py-5">
        <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-center mb-7">
          Team
        </p>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabled"
          value={selectedGame}
          onChange={handleGameChange}
          className="mb-5 m-3 text-gray-500 w-full sm:w-max"
        >
          {teams.map((team) => (
            <MenuItem value={team.game} key={team.game} className="flex justify-center items-center text-lg">
              {team.game} <span className="text-xs">{team.name}</span>
            </MenuItem>
          ))}
        </Select>
        <div className="gap-10 flex flex-wrap">
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
                  <Button
                    variant="contained"
                    className="bg-[#14C570] flex normal-case space-x-2 hover:space-x-4 text-lg"
                  >
                    <span>Join Us</span>
                    <ArrowForwardIcon className="" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const teams = [
  {
    game: "Call of Duty",
    name: "Team Core",
    team: [
      {
        name: "Bhabishya Dhakal Chhetri",
        ign: "tcr-sexy.44",
        image: captain,
        role: "Player",
        igRole: "Captain",
        rank: "Diamond",
        level: 350,
      },
      {
        name: "John Doe",
        nickname: "JD",
        image: captain,
        role: "Admin",
        igRole: "Manager",
        breifResponsibility: "Managing team schedules",
      },
      {
        name: "Jane Smith",
        nickname: "tcr-ace.21",
        image: captain,
        role: "Admin",
        igRole: "Coach",
        breifResponsibility: "Coach team to be better players",
      },
      {
        name: "Alice Johnson",
        ign: "tcr-queen.99",
        image: captain,
        role: "Player",
        igRole: "Support",
        rank: "Gold",
        level: 250,
      },
      {
        name: "Bob Brown",
        ign: "tcr-king.77",
        image: captain,
        role: "Player",
        igRole: "Striker",
        rank: "Silver",
        level: 200,
      },
      {
        name: "Alice Johnson",
        ign: "tcr-queen.99",
        image: captain,
        role: "Player",
        igRole: "Support",
        rank: "Gold",
        level: 250,
      },
      {
        name: "Bob Brown",
        ign: "tcr-king.77",
        image: captain,
        role: "Player",
        igRole: "Striker",
        rank: "Silver",
        level: 200,
      },
      {
        name: "Alice Johnson",
        ign: "tcr-queen.99",
        image: captain,
        role: "Player",
        igRole: "Support",
        rank: "Gold",
        level: 250,
      },
    ],
  },
  {
    game: "Pub G",
    name: "Phoenix Core",
    team: [
      {
        name: "John Doe",
        nickname: "JD",
        image: captain,
        role: "Admin",
        igRole: "Manager",
        breifResponsibility: "Managing team schedules",
      },
      {
        name: "Jane Smith",
        nickname: "tcr-ace.21",
        image: captain,
        role: "Admin",
        igRole: "Coach",
        breifResponsibility: "Coach team to be better players",
      },
      {
        name: "Alice Johnson",
        ign: "tcr-queen.99",
        image: captain,
        role: "Player",
        igRole: "Support",
        rank: "Gold",
        level: 250,
      },
      {
        name: "Bob Brown",
        ign: "tcr-king.77",
        image: captain,
        role: "Player",
        igRole: "Striker",
        rank: "Silver",
        level: 200,
      },
      {
        name: "Alice Johnson",
        ign: "tcr-queen.99",
        image: captain,
        role: "Player",
        igRole: "Support",
        rank: "Gold",
        level: 250,
      },
      {
        name: "Bob Brown",
        ign: "tcr-king.77",
        image: captain,
        role: "Player",
        igRole: "Striker",
        rank: "Silver",
        level: 200,
      },
      {
        name: "Alice Johnson",
        ign: "tcr-queen.99",
        image: captain,
        role: "Player",
        igRole: "Support",
        rank: "Gold",
        level: 250,
      },
    ],
  },
];
