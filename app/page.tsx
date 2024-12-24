import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Hero from "@/ui/hero-section";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
