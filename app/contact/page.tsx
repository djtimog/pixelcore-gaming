import Image from "next/image";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from "@mui/material";
import Link from "next/link";

export default function Contact() {
  return (
    <main className="px-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-2 sm:p-3 md:p-5">
        <div className="overflow-hidden md:order-2">
          <Image
            src={"/contact/contact-image.jpg"}
            alt="contact-us"
            width={1000}
            height={300}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center text-center md:text-left md:col-span-2 space-y-7 mx-auto">
          <h1 className="text-4xl">Get In Touch</h1>
          <p className="text-md">
            Want to get in touch?, We'd love to hear from you
            <br />
            Here's how you can reach us...
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-2 sm:p-3 md:p-5">
        <div className="w-full p-5 text-center bg-slate-500 rounded-lg">
          <IconButton size="large">
            <LocalPhoneIcon className="text-[#14C570] text-4xl" />
          </IconButton>
          <h3 className="text-xl font-bold my-5">Talk to Sales</h3>
          <p className="mb-3">
            <span className="font-semibold">Interested in Pixelcore?</span> Our sales team is here to help you with any
            inquiries about our eSports services and solutions. Reach out to us
            for more information and to discuss how we can assist you in
            achieving your goals.
          </p>
          <Link
            href={`tel:+234 705 355 4961`}
            className="text-blue-500 underline mt-5"
          >
            +234 705 355 4961
          </Link>
          <Link
            href={`#global-contact`}
            className="text-[#14C570] mt-5 block text-center"
          >
            See all global contact

            <KeyboardArrowDownIcon className="text-2xl block mx-auto"/>
          </Link>
        </div>
        <div className="w-full p-5 text-center bg-slate-500 rounded-lg">
          <IconButton size="large">
            <LocalPhoneIcon className="text-[#14C570] text-4xl" />
          </IconButton>
          <h3 className="text-xl font-bold my-5">Talk to Sales</h3>
          <p className="mb-3">
            <span className="font-semibold">Interested in Pixelcore?</span> Our sales team is here to help you with any
            inquiries about our eSports services and solutions. Reach out to us
            for more information and to discuss how we can assist you in
            achieving your goals.
          </p>
          <Link
            href={`tel:+234 705 355 4961`}
            className="text-blue-500 underline mt-5"
          >
            +234 705 355 4961
          </Link>
          <Link
            href={`#global-contact`}
            className="text-[#14C570] mt-5 block text-center"
          >
            See all global contact

            <KeyboardArrowDownIcon className="text-2xl block mx-auto"/>
          </Link>
        </div>
      </div>
    </main>
  );
}
