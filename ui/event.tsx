// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import Image from "next/image";
// import Link from "next/link";

// export default function EventCard ({
//   date,
//   title,
//   image,
//   status,
// }: {
//   date: string;
//   title: string;
//   image: string;
//   status: string;
// }){
//   return (
//     <div className="relative h-80 w-60 rounded-lg overflow-hidden shadow-lg">
//       {/* Background Image */}
//       <div className="absolute top-0 left-0 w-full h-full z-0">
//         <Image
//           src={image}
//           alt={title}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-lg"
//         />
//       </div>

//       {/* Overlay */}
//       <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 rounded-lg"></div>

//       {/* Text Content */}
//       <div className="relative z-20 flex flex-col justify-between h-full text-center text-white p-4">
//         {/* Title and Date */}
//         <div>
//           <h3 className="text-xl font-bold">{title}</h3>
//           <p className="text-sm opacity-75 mt-1">{date}</p>
//         </div>

//         {/* Status and Details */}
//         <div className="mt-auto">
//           <div
//             className={`py-1 px-4 rounded-full border-2 text-sm ${
//               status.toLowerCase() === "offline"
//                 ? "border-rose-500 text-rose-500"
//                 : "border-green-500 text-green-500"
//             }`}
//           >
//             {status.toUpperCase()}
//           </div>

//           {status.toLowerCase() === "offline" && (
//             <Link
//               href={`/events/${title}`}
//               className="text-[#14C570] text-xs mt-2 inline-block"
//             >
//               View Details
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// // const EventSection = () => {
// //   const events = [
// //     {
// //       date: "August 17th - 21st",
// //       title: "Regional Qualifiers Africa",
// //       image: "/black-bg-image.jpg",
// //       status: "offline",
// //     },
// //     {
// //       date: "November 11th - 19th",
// //       title: "World Esports Championship",
// //       image: "/white-bg-image.jpg",
// //       status: "online",
// //     },
// //     {
// //       date: "December 5th - 6th",
// //       title: "World Esports Summit",
// //       image: "/black-bg-image.jpg",
// //       status: "offline",
// //     },
// //     {
// //       date: "November 11th - 19th",
// //       title: "World Esports Championship",
// //       image: "/white-bg-image.jpg",
// //       status: "online",
// //     },
// //     {
// //       date: "December 5th - 6th",
// //       title: "World Esports Summit",
// //       image: "/black-bg-image.jpg",
// //       status: "offline",
// //     },
// //     {
// //       date: "November 11th - 19th",
// //       title: "World Esports Championship",
// //       image: "/white-bg-image.jpg",
// //       status: "online",
// //     },
// //   ];

// //   return (
// //     <div className="relative bg-[#1e1023] py-10">
// //       <h2 className="text-center text-white text-3xl font-bold mb-8">
// //         2024 Events Calendar
// //       </h2>

// //       <Swiper
// //         slidesPerView={3}
// //         spaceBetween={30}
// //         loop={true}
// //         pagination={{
// //           clickable: true,
// //         }}
// //         navigation={true}
// //         modules={[Navigation]}
// //       >
// //         {events.map((event, index) => (
// //           <SwiperSlide key={index}>
// //             <EventCard
// //               date={event.date}
// //               title={event.title}
// //               image={event.image}
// //               status={event.status}
// //             />
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
// //     </div>
// //   );
// // };

// // export default EventSection;
