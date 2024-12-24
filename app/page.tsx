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
          <div className={`h-[92vh] ${styles.bgImage}`}></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
