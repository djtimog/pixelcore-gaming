import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TeamCard = ({
  image,
  name,
  role,
  description,
  email,
  number,
}: {
  image: string;
  name: string;
  role: string;
  description: string;
  email: string;
  number: string;
}) => {
  return (
    <div className="container mx-auto rounded-lg shadow-lg p-5 space-y-3 sm:space-y-0 sm:space-x-5 md:space-x-7 flex flex-col sm:flex-row">
      <div className="w-full sm:max-w-sm h-60 overflow-hidden">
        <Image
          src="/about/team/ceo.jpeg"
          alt={name}
          width={500}
          height={300}
          className="object-contain"
        />
      </div>
      <div className="space-y-3 flex flex-col justify-around">
          <p className="text-lg">{name}</p>
          <p className="text-sm">{role}</p>
          <p className="text-md">{description}</p>
          <Link href={`mailto:${email}`}>{email}</Link>
          <Link href={`tel:${number}`}>
            <Button variant="contained" className="w-full bg-[#00ff00]">
              Contact
            </Button>
          </Link>
      </div>
    </div>
  );
};

export default TeamCard;

export const teamData = [
    {
        image: "/about/ceo.png",
        name: "John Doe",
        role: "CEO",
        description: "John is the CEO of Pixelcore Gaming with over 10 years of experience in the gaming industry.",
        email: "john.doe@example.com",
        number: "+1234567890",
    },
    {
        image: "/about/cto.png",
        name: "Jane Smith",
        role: "CTO",
        description: "Jane is the CTO, leading the tech team with her extensive knowledge in software development.",
        email: "jane.smith@example.com",
        number: "+0987654321",
    },
    {
        image: "/about/coo.png",
        name: "Alex Johnson",
        role: "COO",
        description: "Alex is the COO, overseeing the business operations and ensuring smooth workflow.",
        email: "alex.johnson@example.com",
        number: "+1357924680",
    }
];