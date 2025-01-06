"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import EventCard from "@/ui/event";
import Image from "next/image";
import Link from "next/link";
import styles from "./app.module.scss";
import { useTheme } from "@/app/context/theme-context";
import africaMap from "@/public/africa-map.jpg"

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
            />
            <div className="flex justify-center items-center px-5 py-5">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-center">
                {" "}
                Pixel <span className="text-[#14C570]">C</span>ore Esport <br />
                Team
              </h1>
            </div>
          </div>
        </section>
        <section className={`${styles.event} mt-10`}>
          <div>
            <p className="text-3xl text-center font-bold">Ev<span className="text-[#14C570]">e</span>nts</p>
          </div>
          {/* <div clas>

          </div> */}
          {/* <EventCard date={"November 11th - 19th"} title={"World Esports Championship"} image={"/white-bg-image.jpg"} status={"Online"} /> */}
        </section>
      </main>
      <Footer />
    </>
  );
}

