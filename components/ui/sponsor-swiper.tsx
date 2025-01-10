"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const sponsors = [
  {
    name: "Poco",
    image: "/sponsor/poco.png",
    link: "https://www.poco.com.ng/",
  },
  {
    name: "Classic Tech",
    image: "/sponsor/classic-tech.png",
    link: "https://www.classic.com.np/",
  },
  {
    name: "Khalti",
    image: "/sponsor/khalti.png",
    link: "https://khalti.com/",
  },
  {
    name: "Call of Duty",
    image: "/sponsor/call-of-duty.png",
    link: "https://www.callofduty.com/",
  },
  {
    name: "Mui",
    image: "/sponsor/mui.png",
    link: "https://mui.com/",
  },
];
const SponsorSwiper = () => {
  return (
    <Swiper
      slidesPerView={2}
      loop
      spaceBetween={5}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
          centeredSlides: true,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 13,
          centeredSlides: true,
        },
        1150: {
          slidesPerView: 4,
          spaceBetween: 14,
          
        },
        1300: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
      }}
      modules={[Autoplay]}
      className="mt-5"
    >
      {sponsors.map((sponsor) => (
        <SwiperSlide key={sponsor.name}>
          <div className="h-24 flex justify-center items-center">
            <Link href={sponsor.link}>
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  width={100}
                  height={50}
                  className="h-full w-full object-contain"
                />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SponsorSwiper;
