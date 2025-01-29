import React from "react";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

const MediaCard = ({
  icon,
  title,
  description,
  link,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: Url;
  linkText: string;
}) => {
  return (
    <div className="flex-grow basis-[290px] p-5 text-center bg-slate-500 hover:bg-slate-400 rounded-lg">
      <IconButton size="large">{icon}</IconButton>
      <h3 className="text-xl font-bold my-5">{title}</h3>
      <p className="mb-3">{description}</p>
      <Link href={link} className="text-blue-700 underline mt-5">
        {linkText}
      </Link>
      {title == "Talk to Sales" && (
        <Link
          href={`#global-contact`}
          className="text-[#14C570] mt-5 block text-center"
        >
          <span>See all global contact</span>
          <KeyboardArrowDownIcon className="text-2xl block mx-auto" />
        </Link>
      )}
    </div>
  );
};

export default MediaCard;
