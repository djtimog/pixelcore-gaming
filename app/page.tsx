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
          <div className={`${styles.hero}  `}>
            <video
              src={"/white-bg-video.mp4"}
              autoPlay
              muted
              loop
              className="py-9 md:py-0 dark:hidden"
            />
            <video
              src={"/black-bg-video.mp4"}
              autoPlay
              muted
              loop
              className="py-9 md:py-0 hidden dark:block "
            />
            <div className="flex justify-center items-center px-5 py-5 bg-black bg-opacity-40 dark:bg-opacity-60  ">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-center">
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

        <section className="my-10 py-5 -space-y-3 ">
          <p
            className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-end pe-3"
            data-translate
          >
            Achievement
          </p>
          <div className="bg-[#14C570] relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-11 space-y-7 sm:space-y-0 sm:space-x-5  ">
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
                  <span data-translate>International</span>
                  <br />
                  <span data-translate>Champ</span>
                </span>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 text-center md:text-start justify-center items-center">
                <span className="text-4xl font-bold">5</span>
                <span className="leading-5">
                  <span data-translate>International</span>
                  <br />
                  <span data-translate>Runner up</span>
                </span>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 text-center md:text-start justify-center items-center">
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

        <section className="my-12 py-5 -space-y-3">
          <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-start ps-3" data-translate>
            Team
          </p>
          <div className="space-y-10">
            <div className="space-y-5 sm:space-y-7 md:space-y-9  ">
              <TeamList />
              <div className="px-11 text-end mb-5">
                <Link href={`/team`}>
                  <Button className="normal-case text-black w-full md:w-auto rounded text-lg" data-translate>
                    More Info On Our Team!
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white slideInEffect-40">
              <div className="py-5 sm:py-0 max-h-[25rem]">
                <Image
                  src={teamImage}
                  alt="team image"
                  className="object-cover w-full z-0"
                />
              </div>
              <div className="absolute top-0 bg-black w-full h-full bg-opacity-50 flex justify-center sm:justify-start items-center px-5">
                <div className="text-center sm:text-start p-5 sm:px-11 space-y-2 sm:space-y-5 md:space-y-7 sm:w-2/3 md:w-1/2 xl:1/3">
                  <h6 className="text-[#14C570] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold" data-translate>
                    Team Core
                  </h6>
                  <h4 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl md:font-semibold" data-translate>
                    Join with our team and family
                  </h4>

                  <div className="flex justify-center sm:justify-start md:pt-10">
                    <Link href="/events">
                      <Button className="flex normal-case space-x-2 hover:space-x-4 text-lg rounded">
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

        <section className="my-10 py-5 -space-y-3 ">
          <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-end pe-3" data-translate>
            Sponsor
          </p>
          <div className="bg-[#14C570] py-5 relative  ">
            <SponsorSwiper />
          </div>
        </section>

        <section className="my-10 py-5 -space-y-3">
          <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-start ps-3" data-translate>
            Blog
          </p>
          <div className="relative px-11 space-y-10  ">
            <div className="space-y-5">
              <div className="flex justify-center items-center overflow-hidden max-h-[510px]">
                <Image
                  src={activeBlog}
                  alt="active blog"
                  width={100}
                  height={100}
                  className="object-contain w-full lg:object-cover"
                />
              </div>
              <div>
                <p className="text-xs mb-2">17-12-2021</p>
                <Link href="/blog">
                  <h2 className="mb-5 md:mb-7 text-xl font-bold text-[#14C570]" data-translate>
                    PUBG Mobile Pro League - South Asia Spring 2022
                  </h2>
                </Link>
                <p className="text-sm">
                 <span data-translate>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    re et dolore magna aliqua. re et dolore magna aliqua. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt <br /> ut labore et dolore magna
                    aliqua. re et dolore magna aliqua. re et dolore magnaaliqua...
                 </span>
                  <Link href="/blog" className="text-[#14C570] px-1" data-translate>
                    Read more.
                  </Link>
                </p>
              </div>
            </div>
            <div className=" ">
              <h2 className="mb-7 text-lg font-bold" data-translate>Other Blogs</h2>
              <OtherBlogs activeBlogId="12345-543-25637" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
