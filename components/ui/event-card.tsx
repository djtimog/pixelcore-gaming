import React from "react";
import Image from "next/image";
import Link from "next/link";

const EventCard = ({ event }: any) => {
  const statusClass = (status: string) => {
    return status === "Online"
      ? "bg-[#14C570] text-white"
      : "border border-gray-500 text-gray-500";
  };

  return (
    <div className="bg-gray-300 h-[15rem] w-[10rem] rounded-md shadow-lg relative">
      <Image
        src={event.image}
        alt={event.title}
        width={100}
        height={100}
        className="w-full h-full object-contain rounded-md"
      />
      <div className="absolute bottom-0 left-0 bg-gray-400 bg-opacity-70 rounded-md h-full w-full flex flex-col justify-between text-center p-2">
        <div className="space-y-5">
          <h3 className="text-xl font-bold text-black">{event.title}</h3>
          <p className="text-sm font-semiboldmt-1 text-black">{event.date}</p>
        </div>
        <div>
          <div className={`${statusClass(event.status)} px-2 py-1 rounded`}>
            {event.status}
          </div>
          {event.status === "Online" && (
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
};

export default EventCard;
