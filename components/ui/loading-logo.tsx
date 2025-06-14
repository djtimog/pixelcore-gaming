"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function LogoAnimation() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      height: ["0%", "100%", "1%"],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <div className="size-20 overflow-hidden rounded-lg">
      <motion.div animate={controls} className="relative w-full">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
