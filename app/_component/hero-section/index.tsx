import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

const Hero = () => {
  return (
    <Box
      className="relative flex flex-col lg:flex-row items-center text-center bg-gray-600 lg:text-left p-8 text-white space-y-4 lg:space-y-0 lg:space-x-6"
    >
      {/* Left Side Text */}
      <Box className="lg:w-1/2 space-y-4">
        <Typography variant="h6" className="text-[#14C570] font-semibold">
          Pixelcore Team
        </Typography>
        <Typography variant="h1" className="text-5xl font-bold leading-tight">
          Not Just a Team, We are Family
        </Typography>
        
        <div>
            <div>
                <Typography className="leading-relaxed">
                    Dominate the world by playing games is our goal, whatever we will play for the sake of mastering the game world. Support and join us if you want to rule the world.
                </Typography>
            </div>
            <Box className="flex space-x-0 mt-6">
                <Button
                    variant="contained"
                    color="primary"
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    Become a member
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    className="border-white text-white hover:bg-gray-700"
                >
                    Join Bootcamp
                </Button>
            </Box>
        </div>
      </Box>

      {/* Right Side Image */}
      {/* <Box className="lg:w-1/2 flex justify-center lg:justify-end">
        <Image
          src="/path/to/your-image.png" // Update this path to your image
          alt="Bee Esport Team"
          className="w-full max-w-md lg:max-w-lg shadow-lg rounded-lg"
        />
      </Box> */}
    </Box>
  );
};

export default Hero;
