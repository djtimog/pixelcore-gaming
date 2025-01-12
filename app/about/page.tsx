import React from "react";
import Image from "next/image";
import teamImage from "@/public/about/team-image.jpg";
function about() {
  return (
    <main>
      <section>
        <div className="w-full max-h-96 overflow-hidden">
          <Image
            src={teamImage}
            alt="team image"
            width={5000}
            height={1000}
            className="w-full object-cover"
          />
        </div>
        <div className="px-5 py-8 space-y-7">
          <div>
            <h1 className="text-[#00ff00] text-4xl underline underline-offset-4 mb-2 text-center">
              About Us
            </h1>
            <p className="w-full sm:w-2/3 md:w-1/2 mx-auto text-center">
              Welcome to <strong className="text-[#00ff00]">Pixelcore</strong>,
              a premier esports organization and broadcasting network based in
              Nigeria, Africa. We are dedicated to empowering African gamers and
              fostering the growth of esports in Nigeria and across the
              continent.
            </p>
          </div>
          <div>
            <h3 className="text-[#00ff00] text-2xl mb-2 text-center">
              Our Vision
            </h3>
            <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0">
              <div className="flex items-center justify-center md:justify-start md:ps-5">
                <p className="w-full sm:w-2/3 text-center md:text-left">
                  "To establish Pixelcore as the leading esports organization
                  and broadcasting network in Africa, fostering a thriving
                  gaming ecosystem that unlocks the potential of Nigerian and
                  African gamers, and propels the industry into the mainstream."
                </p>
              </div>
              <div className="w-full max-h-64 overflow-hidden md:order-first">
                <Image
                  src={"/about/vision-image.png"}
                  alt="team image"
                  width={5000}
                  height={1000}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[#00ff00] text-2xl mb-2 text-center">
            Our Mission
            </h3>
            <div className="flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0">
              <div className="flex items-center justify-center md:justify-start md:ps-5">
                <p className="w-full sm:w-2/3 text-center md:text-left">
                To provide a platform for African gamers to develop their skills,
                showcase their talent, and pursue professional careers in esports.
                </p>
              </div>
              <div className="w-full max-h-64 overflow-hidden md:order-first">
                <Image
                  src={"/about/vision-image.png"}
                  alt="team image"
                  width={5000}
                  height={1000}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[#00ff00] text-2xl text-center mb-4">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
              <div className="p-5 rounded-lg">
                <h3 className="text-[#00ff00] text-xl">John Doe</h3>
                <p>CEO & Founder</p>
                {/* <Image src={} alt="" /> */}
              </div>
              <div className=" p-5 rounded-lg">
                <h3 className="text-[#00ff00] text-xl">Jane Doe</h3>
                <p>COO & Co-Founder</p>
                {/* <Image src={} alt="" /> */}
              </div>
              <div className=" p-5 rounded-lg">
                <h3 className="text-[#00ff00] text-xl">Alex Smith</h3>
                <p>CTO & Co-Founder</p>
                {/* <Image src={} alt="" /> */}
              </div>
            </div>
          </div>
        </div>
        <section id="about-us">
          <div className="container">
            <h3>Core Values</h3>
            <ul>
              <li>
                <strong>Innovation</strong>: Shaping the future of esports with
                creativity and cutting-edge solutions.
              </li>
              <li>
                <strong>Excellence</strong>: Ensuring exceptional quality in
                every endeavor.
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
                <strong>Community</strong>: Advocating inclusivity, diversity,
                and growth within esports.
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
            <h3>Our Objectives</h3>
            <ol>
              <li>
                Establish Pixelcore as a top-tier esports organization in
                Africa.
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
      </section>
    </main>
  );
}

export default about;
