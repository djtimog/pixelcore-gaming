import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import africaMap from "@/public/africa-map.jpg";

interface EventCardProps {
  date: string;
  title: string;
  image: string;
  status: string;
}

const EventCard: React.FC<EventCardProps> = ({ date, title, image, status }) => {
  const statusClass = status === "Online" ? "bg-[#14C570] text-white" : "border border-gray-500 text-gray-500";

  return (
    
  );
};

export default EventCard;
