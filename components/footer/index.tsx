import { Typography, TextField, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-7 md:px-16">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:flex justify-between gap-8">
        <div className="">
          <Link href="/">
            <Image src={logo} alt="Logo" width={70} height={80} />
          </Link>
          <div className="w-2/3">
            <p className="mt-4">
              Professional E-sport team in Nigeria
            </p>
          </div>
        </div>

        <div>
          <h6 className="font-bold mb-4 text-[#14C570]">
            Quick Links
          </h6>
          <ul className="space-y-5">
            <li>
              <Link href="#" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Schedule
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold mb-4 text-[#14C570]">
            Join with Us
          </h6>
          <ul className="space-y-5">
            <li>
              <Link href="#" className="hover:text-white">
                Becoming a member
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Join the team
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Match streaming
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold mb-4 text-[#14C570]">
            Support
          </h6>
          <ul className="space-y-5">
            <li>
              <Link href="#" className="hover:text-white">
                Customer services
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Email us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:flex justify-between mt-8 align-center items-center">
        <div className="mb-4">
          <div className="mt-4 bg-white rounded-lg flex items-center p-1 w-full">
            <input
              type="email"
              placeholder="Your Email Address"
              className="mr-4 p-2 md:py-2 md:px-3 focus:outline-none text-black w-full"
            />
            <div className="min-w-max">
              <button
                type="submit"
                className="md:py-3 md:px-3 p-2 bg-[#14C570] text-white rounded-lg"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/5">
          <span className="text-xs">
            &copy;2024 Pixelcore | Design by TCR-timog with{" "}
            <span className="text-[#14C570]">&hearts;</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
