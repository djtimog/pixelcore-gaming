"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./app.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import captain from "@/public/captain.png";
import { TeamList } from "@/components/ui/profile-card";
import teamImage from "@/public/team-image.png";
import SponsorSwiper from "@/components/ui/sponsor-swiper";
import activeBlog from "@/public/blog/active-blog.svg";
import OtherBlogs from "@/components/ui/other-blogs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main>
        <section className="home">
          <div className={`${styles.hero} `}>
            <video
              src={"/white-bg-video.mp4"}
              autoPlay
              muted
              loop
              className="py-9 dark:hidden md:py-0"
            />
            <video
              src={"/black-bg-video.mp4"}
              autoPlay
              muted
              loop
              className="hidden py-9 dark:block md:py-0"
            />
            <div className="flex items-center justify-center bg-black bg-opacity-40 px-5 py-5 dark:bg-opacity-60">
              <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-7xl">
                {" "}
                <span data-translate>Pixel</span>
                <span className="text-[#14C570]" data-translate>
                  C
                </span>
                <span data-translate>ore</span>{" "}
                <span data-translate>Esport</span> <br />
                <span data-translate>Team</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="my-10 -space-y-3 py-5">
          <p
            className="outlined-text pe-3 text-end text-4xl uppercase sm:text-5xl md:text-6xl"
            data-translate
          >
            Achievement
          </p>
          <div className="relative grid grid-cols-1 space-y-7 bg-[#14C570] p-11 sm:grid-cols-2 sm:space-x-5 sm:space-y-0 md:grid-cols-4">
            <div className="flex items-center justify-center md:h-[70px]">
              <Image
                src={captain}
                alt="Captain"
                className="h-[17rem] w-[12rem] rounded-xl object-cover sm:object-contain md:w-[15rem]"
              />
            </div>
            <div className="grid grid-cols-1 space-y-5 md:col-span-3 md:grid-cols-3 md:space-x-5 md:space-y-0">
              <div className="flex flex-col items-center justify-center space-x-2 space-y-2 text-center md:flex-row md:space-y-0 md:text-start">
                <span className="text-4xl font-bold">8</span>
                <span className="leading-5">
                  <span data-translate>International</span>
                  <br />
                  <span data-translate>Champ</span>
                </span>
              </div>
              <div className="flex flex-col items-center justify-center space-x-2 space-y-2 text-center md:flex-row md:space-y-0 md:text-start">
                <span className="text-4xl font-bold">5</span>
                <span className="leading-5">
                  <span data-translate>International</span>
                  <br />
                  <span data-translate>Runner up</span>
                </span>
              </div>
              <div className="flex flex-col items-center justify-center space-x-2 space-y-2 text-center md:flex-row md:space-y-0 md:text-start">
                <span className="text-4xl font-bold">12</span>
                <span className="leading-5">
                  <span data-translate>National</span>
                  <br />
                  <span data-translate>Champ</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="my-12 -space-y-3 py-5">
          <p
            className="outlined-text ps-3 text-start text-4xl uppercase sm:text-5xl md:text-6xl"
            data-translate
          >
            Team
          </p>
          <div className="space-y-10">
            <div className="space-y-5 sm:space-y-7 md:space-y-9">
              <TeamList />
              <div className="mb-5 px-11 text-end">
                <Link href={`/team`}>
                  <Button
                    className="w-full rounded text-lg normal-case text-black md:w-auto"
                    data-translate
                  >
                    More Info On Our Team!
                  </Button>
                </Link>
              </div>
            </div>
            <div className="slideInEffect-40 relative overflow-hidden bg-white">
              <div className="max-h-[25rem] py-5 sm:py-0">
                <Image
                  src={teamImage}
                  alt="team image"
                  className="z-0 w-full object-cover"
                />
              </div>
              <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 px-5 sm:justify-start">
                <div className="xl:1/3 space-y-2 p-5 text-center sm:w-2/3 sm:space-y-5 sm:px-11 sm:text-start md:w-1/2 md:space-y-7">
                  <h6
                    className="text-lg font-bold text-[#14C570] sm:text-xl md:text-2xl lg:text-3xl"
                    data-translate
                  >
                    Team Core
                  </h6>
                  <h4
                    className="text-2xl text-white sm:text-3xl md:text-4xl md:font-semibold lg:text-6xl"
                    data-translate
                  >
                    Join with our team and family
                  </h4>

                  <div className="flex justify-center sm:justify-start md:pt-10">
                    <Link href="/events">
                      <Button className="flex space-x-2 rounded text-lg normal-case hover:space-x-4">
                        <span data-translate>Join Us</span>
                        <ArrowForwardIcon className="" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-10 -space-y-3 py-5">
          <p
            className="outlined-text pe-3 text-end text-4xl uppercase sm:text-5xl md:text-6xl"
            data-translate
          >
            Sponsor
          </p>
          <div className="relative bg-[#14C570] py-5">
            <SponsorSwiper />
          </div>
        </section>

        <section className="my-10 -space-y-3 py-5">
          <p
            className="outlined-text ps-3 text-start text-4xl uppercase sm:text-5xl md:text-6xl"
            data-translate
          >
            Blog
          </p>
          <div className="relative space-y-10 px-11">
            <div className="space-y-5">
              <div className="flex max-h-[510px] items-center justify-center overflow-hidden">
                <Image
                  src={activeBlog}
                  alt="active blog"
                  width={100}
                  height={100}
                  className="w-full object-contain lg:object-cover"
                />
              </div>
              <div>
                <p className="mb-2 text-xs">17-12-2021</p>
                <Link href="/blog">
                  <h2
                    className="mb-5 text-xl font-bold text-[#14C570] md:mb-7"
                    data-translate
                  >
                    PUBG Mobile Pro League - South Asia Spring 2022
                  </h2>
                </Link>
                <p className="text-sm">
                  <span data-translate>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. re et dolore magna aliqua. re et dolore magna
                    aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt <br /> ut labore et
                    dolore magna aliqua. re et dolore magna aliqua. re et dolore
                    magnaaliqua...
                  </span>
                  <Link
                    href="/blog"
                    className="px-1 text-[#14C570]"
                    data-translate
                  >
                    Read more.
                  </Link>
                </p>
              </div>
            </div>
            <div className=" ">
              <h2 className="mb-7 text-lg font-bold" data-translate>
                Other Blogs
              </h2>
              <OtherBlogs activeBlogId="12345-543-25637" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
