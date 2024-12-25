'use client'
import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import styles from "./app.module.scss"
import { useTheme } from "@/app/context/theme-context";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Header />
      <main>
        <section>
          <div className={`${styles.hero}`}>
            <video 
              src={theme === "light" ? "/white-bg-video.mp4"  : "/black-bg-video.mp4"} 
              autoPlay 
              muted 
              loop 
            />
            <div className="flex justify-center items-center px-5 py-5">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-center"> Pixel <span className="text-[#14C570]">C</span>ore Esport <br/>Team</h1>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
