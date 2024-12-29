import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

export default function EventCard ({
  date,
  title,
  image,
  status,
}: {
  date: string;
  title: string;
  image: string;
  status: string;
}){
  return (
    <div className="bg-gray-300 h-[15rem] w-[10rem] rounded-md shadow-lg relative">
            <Image
              src={image}
              alt={title}
              width={100}
              height={100}
              className="w-full h-full object-contain rounded-md"
            />
            <div className="absolute bottom-0 left-0 bg-gray-400 bg-opacity-70 p-2 w-full h-full rounded-md text-center flex flex-col justify-between">
              <div className="space-y-5">
                <h3 className="text-xl font-bold">
                  {title}
                </h3>
                <p className="text-sm mt-1">{date}</p>
              </div>
              <div className="">
                <div className={`${status === "Online"? "bg-[#14C570] text-white": "border border-gray-500 text-gray-500"} px-2 py-1 rounded`}>
                  {status}
                </div>
                {status === "Online" &&
                  <Link
                    href={`/events/`}
                    className="text-[#14C570] text-xs mt-2 inline-block"
                  >
                    View Details
                  </Link>
                }
              </div>
            </div>
          </div>
  );
};


// const EventSection = () => {
//   const events = [
//     {
//       date: "August 17th - 21st",
//       title: "Regional Qualifiers Africa",
//       image: "/black-bg-image.jpg",
//       status: "offline",
//     },
//     {
//       date: "November 11th - 19th",
//       title: "World Esports Championship",
//       image: "/white-bg-image.jpg",
//       status: "online",
//     },
//     {
//       date: "December 5th - 6th",
//       title: "World Esports Summit",
//       image: "/black-bg-image.jpg",
//       status: "offline",
//     },
//     {
//       date: "November 11th - 19th",
//       title: "World Esports Championship",
//       image: "/white-bg-image.jpg",
//       status: "online",
//     },
//     {
//       date: "December 5th - 6th",
//       title: "World Esports Summit",
//       image: "/black-bg-image.jpg",
//       status: "offline",
//     },
//     {
//       date: "November 11th - 19th",
//       title: "World Esports Championship",
//       image: "/white-bg-image.jpg",
//       status: "online",
//     },
//   ];

//   return (
//     <div className="relative bg-[#1e1023] py-10">
//       <h2 className="text-center text-white text-3xl font-bold mb-8">
//         2024 Events Calendar
//       </h2>

//       <Swiper
//         slidesPerView={3}
//         spaceBetween={30}
//         loop={true}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true}
//         modules={[Navigation]}
//       >
//         {events.map((event, index) => (
//           <SwiperSlide key={index}>
//             <EventCard
//               date={event.date}
//               title={event.title}
//               image={event.image}
//               status={event.status}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default EventSection;
