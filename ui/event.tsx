import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import africaMap from "@/public/africa-map.jpg";

export default function EventCard({
  date,
  title,
  image,
  status,
}: {
  date: string;
  title: string;
  image: string;
  status: string;
}) {
  const [hoverEvent, setHoverEvent] = useState<boolean>(false);

  return (
    <div
      className="bg-gray-300 h-[15rem] w-[10rem] rounded-md shadow-lg relative"
      onMouseOver={() => setHoverEvent(true)}
      onMouseEnter={() => setHoverEvent(true)}
      onMouseLeave={() => setHoverEvent(false)}
    >
      <Image
        src={africaMap}
        alt={title}
        width={100}
        height={100}
        className={`w-full h-full object-contain ${
          hoverEvent ? "object-cover" : "object-contain"
        } rounded-md`}
      />
      <div className="absolute bottom-0 left-0 bg-gray-400 bg-opacity-70 p-2 w-full h-full rounded-md text-center flex flex-col justify-between">
        <div className="space-y-5">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm mt-1">{date}</p>
        </div>
        <div className="">
          <div
            className={`${
              status === "Online"
                ? "bg-[#14C570] text-white"
                : "border border-gray-500 text-gray-500"
            } px-2 py-1 rounded`}
          >
            {status}
          </div>
          {status === "Online" && (
            <Link
              href={`/events/`}
              className="text-[#14C570] text-xs mt-2 inline-block"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
