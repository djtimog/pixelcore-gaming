import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Logo from "@/public/logo.png";
import HeroImage from "@/public/hero-group.png";
import captainImage from "@/public/captain.png";
import Link from 'next/link';

const Hero = () => {
  return (
    <Box
      className="flex flex-col md:flex-row items-center lg:text-left p-8 md:p-10 space-y-4 lg:space-y-0 lg:space-x-6"
    >
      <Box className="lg:w-2/3 space-y-4">
        <Typography variant="h5" className="text-[#14C570] font-semibold">
          Pixel Core<br/>
          <span className="text-gray-500 font-semibold">Esport Team (Team Core)</span>
        </Typography>
        <Typography variant="h1" className=" font-bold ">
          Not Just a Team, We are Family
        </Typography>
      </Box>
      <Box className="md:flex space-x-4 w-full lg:w-1/2 lg:justify-end ">
        <Box className="">
          <Image
            src={HeroImage}
            alt="Pixelcore Gaming Esport Team (Team Core)"
            className="w-[50rem] md:max-w-md lg:max-w-lg shadow-lg"
          />
        </Box>
        {/* <Box>
          <div className="absolute w-2/3 sm:w-1/2 md:w-2/3 bg-opacity-50 backdrop-blur-lg right-0 bottom-0">
              <div className='sm:p-5 p-3'>
                  <Typography className="leading-relaxed text-white ">
                      Dominate the world by playing games is our goal, whatever we will play for the sake of mastering the game world. Support and join us if you want to rule the world.
                  </Typography>
              </div>
              <div className="flex space-x-0 sm:mt-6 mt-3 w-full">
                  <button
                      className="bg-[#14C570] hover:bg-[#14C600] text-white w-2/3 py-4"
                  >
                      Become a member
                  </button>
                  <button
                      className="bg-white text-black hover:bg-gray-700 w-1/3 py-4"
                  >
                      Join Bootcamp
                  </button>
              </div>
          </div>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Hero;
