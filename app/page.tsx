"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
// import EventCard from "@/ui/event";
import Image from "next/image";
import Link from "next/link";
import styles from "./app.module.scss";
import { useTheme } from "@/app/context/theme-context";
import africaMap from "@/public/africa-map.jpg";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import captain from "@/public/captain.png";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  const statusClass = (status: string) => {
    return status === "Online"
      ? "bg-[#14C570] text-white"
      : "border border-gray-500 text-gray-500";
  };

  return (
    <>
      <Header />
      <main>
        <section className="home">
          <div className={`${styles.hero}`}>
            <video
              src={
                theme === "light"
                  ? "/white-bg-video.mp4"
                  : "/black-bg-video.mp4"
              }
              autoPlay
              muted
              loop
              className="py-10 md:py-0"
            />
            <div className="flex justify-center items-center px-5 py-5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-center">
                {" "}
                Pixel <span className="text-[#14C570]">C</span>ore Esport <br />
                Team
              </h1>
            </div>
          </div>
        </section>

        {/* <section className={`${styles.event} mt-10`}>
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl text-center font-bold outlined-text">Ev<span className="text-[#14C570]">e</span>nts</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8 p-4">
            {events.map((event) => (
              <div key={event.title} className="mx-auto mb-5">
                <div className="bg-gray-300 h-[15rem] w-[10rem] rounded-md shadow-lg relative">
                  <Image
                    src={africaMap}
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
                        <div className={`${statusClass(event.status)} px-2 py-1 rounded`}>{event.status}</div>
                        {event.status === "Online" && (
                          <Link href={`/events/`} className="text-[#14C570] text-xs mt-2 inline-block">
                            View Details
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
              </div>
            ))}
            <div className="m-auto">
              <Link href="/events" className=" text-center">
                <Button variant="contained" className="bg-[#14C570] normal-case">View More
                  <ArrowForwardIcon className="ml-2 hover:ml-4"/>
                </Button>
              </Link>
            </div>
          </div>
        </section> */}

        <section className="mt-10 py-5 -space-y-3">
          <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-end me-3">
            Achievement
          </p>
          <div className="bg-[#14C570] relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-11 space-y-7 sm:space-y-0 sm:space-x-5">
            <div className="md:h-[70px] flex justify-center items-center">
              <Image src={captain} alt="Captain" className="object-cover sm:object-contain h-[17rem] w-[12rem] md:w-[15rem] rounded-xl"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:col-span-3 space-y-5 md:space-y-0 md:space-x-5">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 text-center md:text-start justify-center items-center">
                <span className="text-4xl font-bold">8</span>
                <span className="leading-5">International<br/>Champ</span>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 text-center md:text-start justify-center items-center">
                <span className="text-4xl font-bold">5</span>
                <span className="leading-5">International<br/>Runner up</span>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 text-center md:text-start justify-center items-center">
                <span className="text-4xl font-bold">12</span>
                <span className="leading-5">National<br/>Champ</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const events = [
  {
    date: "November 11th - 19th",
    title: "World Esports Championship",
    image: "/white-bg-image.jpg",
    status: "Online",
  },
  {
    date: "December 5th - 12th",
    title: "Regional Qualifiers",
    image: "/regional-qualifiers.jpg",
    status: "Offline",
  },
  {
    date: "January 20th - 25th",
    title: "National Finals",
    image: "/national-finals.jpg",
    status: "Online",
  },
];
