import React from "react";
import Link from "next/link";

const GlobalContact = () => {
  return (
    <section className="my-10" id="global-contact">
      <h1 className="text-3xl text-center mb-11">
        Call Sales using one of our local numbers
      </h1>
      <h4 className="text-xl font-bold text-center mb-10 text-[#14C570]">
        Nigeria
      </h4>
      <div className="flex flex-wrap gap-10 text-center justify-center">
        {nigeriaContactData.map((contact) => (
          <RegionContact {...contact} key={contact.region} />
        ))}
      </div>
    </section>
  );
};

export default GlobalContact;

const RegionContact = ({
  region,
  phoneNumbers,
  address,
}: {
  region: string;
  phoneNumbers: { number: string; language: string }[];
  address: string;
}) => {
  return (
    <div className="w-80 slideInEffect-40">
      <h4 className="text-lg font-semibold mb-5">{region}</h4>
      <p className="mb-3">{address}</p>
      <div>
        {phoneNumbers.map((phone, index) => (
          <p key={index} className="space-x-3 mb-1">
            <Link
              href={`tel:${phone.number}`}
              className="text-blue-700 underline"
            >
              {phone.number}
            </Link>
            <span className="text-gray-400">({phone.language})</span>
          </p>
        ))}
      </div>
    </div>
  );
};

const nigeriaContactData = [
  {
    region: "Lagos",
    address: "123 Marina Street, Lagos Island, Lagos",
    phoneNumbers: [
      { number: "+234 1 234 5678", language: "English" },
      { number: "+234 1 876 5432", language: "Yoruba" },
    ],
  },
  {
    region: "Abuja",
    address: "456 Garki Road, Central Business District, Abuja",
    phoneNumbers: [
      { number: "+234 9 123 4567", language: "English" },
      { number: "+234 9 765 4321", language: "Hausa" },
    ],
  },
  {
    region: "Port Harcourt",
    address: "789 Trans-Amadi Industrial Layout, Port Harcourt",
    phoneNumbers: [
      { number: "+234 84 234 5678", language: "English" },
      { number: "+234 84 876 5432", language: "Igbo" },
    ],
  },
  {
    region: "Kano",
    address: "321 Bompai Road, Kano",
    phoneNumbers: [
      { number: "+234 64 123 4567", language: "Hausa" },
      { number: "+234 64 765 4321", language: "English" },
    ],
  },
];
