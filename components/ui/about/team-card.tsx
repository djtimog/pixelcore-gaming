import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

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
    <div className="mx-auto rounded-lg shadow-lg p-5 space-y-3 sm:space-y-0 sm:space-x-5 md:space-x-7 flex flex-col sm:flex-row w-full">
      <div className="w-full sm:max-w-sm h-60 overflow-hidden slideInEffect-30">
        <Image
          src={image}
          alt={name}
          width={500}
          height={300}
          className="object-contain"
        />
      </div>
      <div className="space-y-3 flex flex-col justify-around slideInEffect-30">
        <p className="text-lg">{name}</p>
        <p className="text-sm">{role}</p>
        <p className="text-md">{description}</p>
        <Link href={`mailto:${email}`} className="text-blue-700 underline">
          {email}
        </Link>
        <Link href={`tel:${number}`}>
          <Button
            size={"sm"}
            className="w-full bg-[#00ff00] font-bold dark:font-medium rounded text-white dark:text-black"
          >
            <Phone size={20} />
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
    image: "/about/team/ceo.jpeg",
    name: "John Doe",
    role: "CEO",
    description:
      "John is the CEO of Pixelcore Gaming with over 10 years of experience in the gaming industry.",
    email: "john.doe@example.com",
    number: "+1234567890",
  },
  {
    image: "/about/team/ceo.jpeg",
    name: "Jane Smith",
    role: "CTO",
    description:
      "Jane is the CTO, leading the tech team with her extensive knowledge in software development.",
    email: "jane.smith@example.com",
    number: "+0987654321",
  },
  {
    image: "/about/team/ceo.jpeg",
    name: "Alex Johnson",
    role: "COO",
    description:
      "Alex is the COO, overseeing the business operations and ensuring smooth workflow.",
    email: "alex.johnson@example.com",
    number: "+1357924680",
  },
];
