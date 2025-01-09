"use client";
import Image, { StaticImageData } from "next/image";
import captain from "@/public/captain.png";
import { Typography, Avatar, Button } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

type Player = {
  name: string;
  ign: string;
  image: string | StaticImageData;
  avatarSrc?: string;
  role: string;
  igRole: string;
  rank: string;
  level: number;
};

type Admin = {
  name: string;
  nickname: string;
  image: string | StaticImageData;
  avatarSrc?: string;
  role: string;
  igRole: string;
  breifResponsibility: string;
};

type Profile = Player | Admin;

function stringAvatar(name: string) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ProfileCard = ({ profile }: { profile: Profile }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4 p-0 mx-auto text-white">
      <div className="relative w-[170px] h-[17rem] sm:w-[200px] sm:h-[19rem] md:w-[230px] md:h-[21rem] rounded-lg overflow-hidden bg-white">
        <Image
          src={profile.image}
          alt="captain-image"
          className="z-0 object-cover rounded-lg h-full w-full"
        />
        <div
          className="absolute backdrop-blur-lg bg-[#14C570] bg-opacity-30 backdrop-opacity-60 bottom-0 z-10 rounded-lg w-full hover:h-full py-2 sm:py-3 md:py-4 space-y-1 flex flex-col items-center justify-around"
          onMouseOver={() => setProfileOpen(true)}
          onMouseOut={() => setProfileOpen(false)}
        >
          {profileOpen ? (
            <Avatar
              src={profile.avatarSrc}
              alt={profile.name}
              {...stringAvatar(`${profile.name}`)}
            />
          ) : null}
          <Typography variant="body2" className="text-white text-xs">
            {profile.name}
          </Typography>
          <p className="uppercase font-bold">
            {"ign" in profile ? profile.ign : profile.nickname}
          </p>
          {profileOpen ? (
            <>
              <p className="text-sm">
                ROLE: <span className="font-bold">{profile.role}</span>
              </p>
              {"rank" in profile ? (
                <p className="text-sm">
                  RANK: <span className="font-bold">{profile.rank}</span>
                </p>
              ) : null}
              {"level" in profile ? (
                <p className="text-sm">
                  LEVEL : <span className="font-bold"> {profile.level}</span>
                </p>
              ) : null}
              {"breifResponsibility" in profile ? (
                <div className="space-y-0">
                  <p className="text-center font-bold">
                    Goals
                  </p>
                  <p className="text-xs text-center">
                    {profile.breifResponsibility}
                    </p>
                </div>
              ) : null}
              <Link href="/">
                <Button
                  variant="contained"
                  className="bg-[#14C570] normal-case text-black"
                  size="small"
                >
                  More details
                  <ArrowRightAltIcon />
                </Button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
      <h6 className="text-[#14C570] text-center uppercase text-lg font-bold">
        {profile.igRole}
      </h6>
    </div>
  );
};

const profiles: Profile[] = [
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
];

const ProfileList = () => {

  return (
    <div className="flex overflow-x-auto md:overflow-x-hidden md:flex-wrap gap-8 md:gap-4 px-10">
      {profiles.map((profile, index) => (
        <ProfileCard key={index} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;
