import { Typography, TextField, Button } from '@mui/material';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 md:px-16">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:flex justify-between gap-8">
        <div className=''>
            <Link href="/">
                <Image src={logo} alt="Logo" width={70} height={80} />
            </Link>
            <div className='w-2/3'>
              <Typography variant="body1" className="mt-4 text-xl">Professional E-sport team in Nigeria</Typography>
            </div>
        </div>
        
        <div>
          <Typography variant="h6" className="font-bold mb-4 text-[#14C570]">Quick Links</Typography>
          <ul className="space-y-5">
            <li><Link href="#" className="hover:text-white">Home</Link></li>
            <li><Link href="#" className="hover:text-white">About us</Link></li>
            <li><Link href="#" className="hover:text-white">Schedule</Link></li>
          </ul>
        </div>
        
        <div>
          <Typography variant="h6" className="font-bold mb-4 text-[#14C570]">Join with Us</Typography>
          <ul className="space-y-5">
            <li><Link href="#" className="hover:text-white">Becoming a member</Link></li>
            <li><Link href="#" className="hover:text-white">Join the team</Link></li>
            <li><Link href="#" className="hover:text-white">Match streaming</Link></li>
          </ul>
        </div>
        
        <div>
          <Typography variant="h6" className="font-bold mb-4 text-[#14C570]">Support</Typography>
          <ul className="space-y-5">
            <li><Link href="#" className="hover:text-white">Customer services</Link></li>
            <li><Link href="#" className="hover:text-white">Email us</Link></li>
          </ul>
        </div>
      </div>
      <div className="md:flex justify-between mt-8 align-center items-center">
        <div className="mb-4">
            <div className="mt-4 bg-white rounded flex items-center p-3 w-full">
                <input type="email" placeholder="Your Email Address" className="mr-4 p-2 md:py-3 md:px-4 md:text-lg "/>
                <button type='submit' className="md:py-4 md:px-5 p-2 bg-[#14C570] text-white">Send Email</button>
            </div>
        </div>
        <div className='md:w-1/5'>
            <Typography variant="body2">
            &copy;2024 Pixelcore | Design by TCR-timog with <span className="text-[#14C570]">&hearts;</span>
            </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
