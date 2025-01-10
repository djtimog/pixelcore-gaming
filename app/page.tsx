"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import styles from "./app.module.scss";
import { useTheme } from "@/app/context/theme-context";
import { Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import captain from "@/public/captain.png";
import { TeamList } from "@/components/ui/profile-card";
import teamImage from "@/public/team-image.png";
import SponsorSwiper from "@/components/ui/sponsor-swiper"

export default function Home() {
  const { theme, toggleTheme } = useTheme();

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

        <section className="my-10 py-5 -space-y-3">
          <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-end pe-3">
            Achievement
          </p>
          <div className="bg-[#14C570] relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-11 space-y-7 sm:space-y-0 sm:space-x-5">
            <div className="md:h-[70px] flex justify-center items-center">
              <Image
                src={captain}
                alt="Captain"
                className="object-cover sm:object-contain h-[17rem] w-[12rem] md:w-[15rem] rounded-xl"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:col-span-3 space-y-5 md:space-y-0 md:space-x-5">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 text-center md:text-start justify-center items-center">
                <span className="text-4xl font-bold">8</span>
                <span className="leading-5">
                  International
                  <br />
                  Champ
                </span>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 text-center md:text-start justify-center items-center">
                <span className="text-4xl font-bold">5</span>
                <span className="leading-5">
                  International
                  <br />
                  Runner up
                </span>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 text-center md:text-start justify-center items-center">
                <span className="text-4xl font-bold">12</span>
                <span className="leading-5">
                  National
                  <br />
                  Champ
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="my-12 py-5 -space-y-3">
          <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-start ps-3">
            Team
          </p>
          <div className="space-y-10">
            <TeamList />
            <div className="relative overflow-hidden bg-white">
              <div className="py-5 sm:py-0">
                <Image
                  src={teamImage}
                  alt="team image"
                  className="object-contain w-full z-0"
                />
              </div>
              <div className="absolute top-0 bg-black w-full h-full bg-opacity-50 flex justify-center sm:justify-start items-center px-5">
                <div className="text-center sm:text-start p-5 sm:px-11 space-y-2 sm:space-y-5 md:space-y-7 sm:w-2/3 md:w-1/2">
                  <h6 className="text-[#14C570] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                    Team Core
                  </h6>
                  <h4 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl md:font-semibold">
                    Join with our team and family
                  </h4>

                  <div className="flex justify-center sm:justify-start md:pt-10">
                    <Link href="/events">
                      <Button
                        variant="contained"
                        className="bg-[#14C570] flex normal-case space-x-2 hover:space-x-4 text-lg"
                      >
                        <span>Join Us</span>
                        <ArrowForwardIcon className="" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-10 py-5 -space-y-3">
          <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-end pe-3">
            Sponsor
          </p>
          <div className="bg-[#14C570] py-5 relative">
            <SponsorSwiper />
          </div>
          </section>

        <section className="my-10 py-5 -space-y-3">
          <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-start ps-3">
            Blog
          </p>
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
