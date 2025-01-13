import React from "react";
import Image from "next/image";
import teamImage from "@/public/about/team-image.jpg";
import Link from "next/link";
import TeamCard, { teamData } from "@/components/ui/about/team-card";

function about() {
  return (
    <main>
      <section>
        <div className="w-full max-h-96 overflow-hidden flex justify-center items-center">
          <Image
            src={teamImage}
            alt="team image"
            width={5000}
            height={1000}
            className="w-full object-cover"
          />
        </div>
        <div className="space-y-5 p-7 sm:p-11">
          <p className="uppercase outlined-text text-4xl sm:text-5xl md:text-6xl text-center">
            About Us
          </p>
          <p className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto text-center">
            Welcome to{" "}
            <strong className="text-[#00ff00]">
              <Link href={"/"}>Pixelcore</Link>
            </strong>
            , a premier esports organization and broadcasting network based in
            Nigeria, Africa. We are dedicated to empowering African gamers and
            fostering the growth of esports in Nigeria and across the continent.
          </p>
        </div>
      </section>

      <section className="my-5 p-7 sm:p-11">
        <p className="uppercase outlined-text text-3xl sm:text-4xl md:text-5xl text-center mb-3">
          Our Vision
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="overflow-hidden flex justify-center items-center w-full">
            <Image
              src={"/about/vision-image.png"}
              alt="team image"
              width={5000}
              height={1000}
              className="w-full object-contain sm:object-cover"
            />
          </div>
          <p className="text-center md:text-start col-span-2 mt-5">
            <span className="hidden md:block">
              "To establish Pixelcore as the leading esports organization and
              broadcasting network in Africa, fostering a thriving gaming
              ecosystem that unlocks the potential of Nigerian and African
              gamers, and propels the industry into the mainstream."
            </span>
            <br />
            <span>
              "To revolutionize the esports industry in Africa by building a
              thriving ecosystem where African gamers can achieve their full
              potential, be globally recognized, and inspire future generations.
              Pixelcore envisions a future where esports becomes a mainstream
              avenue for empowerment, innovation, and cultural connection across
              the continent."
            </span>
          </p>
        </div>
      </section>

      <section className="my-5 p-7 sm:p-11">
        <p className="uppercase outlined-text text-3xl sm:text-4xl md:text-5xl text-center mb-3">
          Our Mission
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <p className="text-center md:text-start col-span-2 mt-5 ">
            <span>
              "Pixelcore is committed to driving the growth of esports in Africa
              by creating opportunities for gamers to showcase their talents,
              develop professionally, and compete on global platforms. Our
              mission is to serve as the bridge between African gaming talent
              and the international esports scene by offering the tools,
              resources, and platforms they need to succeed"
            </span>
            <br />
            <span className="hidden lg:block">
              Pixelcore is also focused on building connections—not only among
              gamers but also between the gaming community and broader
              industries like entertainment, technology, and education. By
              promoting esports as a legitimate career path and a means of
              self-expression, we seek to inspire confidence, creativity, and
              resilience in the next generation of African gamers.
            </span>
          </p>
          <div className="overflow-hidden flex justify-center items-center w-full order-first md:order-last">
            <Image
              src={"/about/mission-image.jpeg"}
              alt="team image"
              width={5000}
              height={1000}
              className="w-full object-contain sm:object-cover"
            />
          </div>
        </div>
      </section>

      <section className="my-5 p-7 sm:p-11">
        <p className="uppercase outlined-text text-3xl sm:text-4xl md:text-5xl text-center mb-3">
          Our Team
        </p>
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          {teamData.map((team) => (
            <TeamCard {...team} />
          ))}
        </div>
      </section>

      <section className="p-7 sm:p-11">
        <p className="uppercase outlined-text text-3xl sm:text-4xl md:text-5xl text-center mb-3">
        Core Values
        </p>
        <div className="space-y-3 sm:space-y-4 md:space-y-5 max-w-max mx-auto">
        <ul className="space-y-5 text-center">
            <li>
              <strong>Innovation</strong>: Shaping the future of esports with
              creativity and cutting-edge solutions.
            </li>
            <li>
              <strong>Excellence</strong>: Ensuring exceptional quality in every
              endeavor.
            </li>
            <li>
              <strong>Future-Focused</strong>: Staying ahead of trends and
              embracing emerging opportunities.
            </li>
            <li>
              <strong>Connection</strong>: Building meaningful relationships
              across communities and industries.
            </li>
            <li>
              <strong>Community</strong>: Advocating inclusivity, diversity, and
              growth within esports.
            </li>
            <li>
              <strong>Neutrality</strong>: Upholding fairness and transparency
              in all interactions.
            </li>
            <li>
              <strong>Collaboration</strong>: Fostering open communication and
              strategic partnerships.
            </li>
          </ul>
        </div>
      </section>
      
      <section className="my-5 p-7 sm:p-11">
        <p className="uppercase outlined-text text-3xl sm:text-4xl md:text-5xl text-center mb-3">
        Our Objectives
        </p>
        <div className="max-w-max mx-auto">
        <ol className="space-y-5 text-center">
            <li>
              Establish Pixelcore as a top-tier esports organization in Africa.
            </li>
            <li>Create a comprehensive esports broadcasting network.</li>
            <li>
              Develop opportunities for African gamers to compete globally.
            </li>
            <li>Promote esports education and training programs.</li>
            <li>Partner with key stakeholders to drive industry growth.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}

export default about;
