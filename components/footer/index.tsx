import { Typography, TextField, Button } from '@mui/material';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex justify-between gap-8">
        <div>
            <Link href="/">
                <Image src={logo} alt="Logo" width={70} height={80} />
            </Link>
          <Typography variant="body1" className="mt-4 text-xl">Professional E-sport team in Nigeria</Typography>
        </div>
        
        <div>
          <Typography variant="h6" className="font-bold mb-4">Quick Links</Typography>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About us</a></li>
            <li><a href="#" className="hover:text-white">Schedule</a></li>
          </ul>
        </div>
        
        <div>
          <Typography variant="h6" className="font-bold mb-4">Join with Us</Typography>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Becoming a member</a></li>
            <li><a href="#" className="hover:text-white">Join the team</a></li>
            <li><a href="#" className="hover:text-white">Match streaming</a></li>
          </ul>
        </div>
        
        <div>
          <Typography variant="h6" className="font-bold mb-4">Support</Typography>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Customer services</a></li>
            <li><a href="#" className="hover:text-white">Email us</a></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between mt-8 align-center items-center">
        <div className="">
            <div className="mt-4 bg-white rounded flex items-center p-3 w-full">
                <input type="email" placeholder="Your Email Address" className="mr-4 py-3 px-4 text-lg"/>
                <button type='submit' className="py-4 px-5 bg-[#EF4602]">Send Email</button>
            </div>
        </div>
        <div className='md:w-1/4'>
            <Typography variant="body2">
            &copy;2024 Pixelcore | Design by TCR-timog with <span className="text-red-500">&hearts;</span>
            </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
