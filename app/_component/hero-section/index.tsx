import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Logo from "@/public/logo.png";
import HeroImage from "@/public/hero-group.png";
import captainImage from "@/public/captain.png";
// import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <Box
      className="relative flex flex-col lg:flex-row items-center text-center lg:text-left p-8 space-y-4 lg:space-y-0 lg:space-x-6"
    >
      {/* Left Side Text */}
      <Box className="lg:w-1/2 space-y-4">
        <Typography variant="h6" className="text-[#14C570] font-semibold">
          Pixelcore Team
        </Typography>
        <Typography variant="h1" className="text-5xl font-bold leading-tight">
          Not Just a Team, We are Family
        </Typography>
      </Box>
      <Box className="flex space-x-4 lg:w-1/2 flex justify-center lg:justify-end">
        <Box className="">
          <Image
            src={HeroImage}
            alt="Pixelcore Gaming Esport Team (Team Core)"
            className="w-full max-w-md lg:max-w-lg shadow-lg rounded-lg"
          />
        </Box>
        <Box>
          <Box className="flex md:flex-col md:space-y-4 items-center">
            <div className="flex items-center justify-center bg-gray-400 p-5 h-1/3 w-full">
              <Image src={Logo} alt="Logo" width={100} height={80} />
            </div>
            <div className="flex items-center justify-center bg-gray-400 p-5 h-1/3 relative w-full">
              <Image
                src={captainImage}
                alt="captain image"
                className="object-cover w-full h-full"
                layout="fill"
              />
            </div>
          </Box>
          <Box>
            <div className="md:absolute w-full sm:w-1/2 md:w-1/3 bg-opacity-50 backdrop-blur-lg md:right-0">
                <div className='p-7'>
                    <Typography className="leading-relaxed text-white">
                        Dominate the world by playing games is our goal, whatever we will play for the sake of mastering the game world. Support and join us if you want to rule the world.
                    </Typography>
                </div>
                <div className="flex space-x-0 mt-6 w-full">
                    <button
                        className="bg-[#14C570] hover:bg-[#14C600] text-white w-2/3 py-5"
                    >
                        Become a member
                    </button>
                    <button
                        className="bg-white text-black hover:bg-gray-700 w-1/3 py-5"
                    >
                        Join Bootcamp
                    </button>
                </div>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
