import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import styles from "./app.module.scss"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section>
          <div className={`h-[92vh] ${styles.bgImage}`}>
            <div className="flex justify-center items-center px-5">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-center"> Pixel <span className="text-[#14C570]">C</span>ore Esport <br/>Team</h1>
                {/* <div class="text-container">
              <span style="--i: 0">Cricket</span>
              <span style="--i: 1">Football</span>
              <span style="--i: 2">Hockey</span>
              <span style="--i: 3">Food</span>
              <span style="--i: 4">Travel</span>
          </div> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
