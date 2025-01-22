import Image from "next/image";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";
import Link from "next/link";
import MediaCard from "@/components/ui/contact/media-card";
import GlobalContact from "@//components/ui/contact/global-contact"

export default function Contact() {
  return (
    <main className="px-5">
      <section className="pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-2 sm:p-3 md:p-5 mb-10">
          <div className="overflow-hidden md:order-2">
            <Image
              src={"/contact/contact-image.jpg"}
              alt="contact-us"
              width={1000}
              height={300}
              className="object-cover w-full"
            />
          </div>
          <div className="flex flex-col justify-center text-center md:text-left md:col-span-2 space-y-7 mx-auto">
            <h1 className="text-4xl">Get In Touch</h1>
            <p className="text-md">
              Want to get in touch?, We'd love to hear from you
              <br />
              Here's how you can reach us...
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-2 sm:p-3 md:p-5">
          {contactDetails.map((detail, index) => (
            <MediaCard {...detail} key={index} />
          ))}
        </div>
      </section>
      <section className="my-10 space-y-5">
        <h1 className="text-3xl text-center">
          Connect with our global office
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 px-5 gap-10">
          <div className="col-span-2 py-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0858576607646!2d-122.4206796846811!3d37.77492977975982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064a2b7f1c1%3A0x9a9211f79e0028c5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1615398706136!5m2!1sen!2sus"
              className="w-full"
              height="350"
              allowFullScreen={true}
              loading="lazy"
              title="Global Headquater"
            ></iframe>
          </div>
          <div className="py-5 md:py-10 px-3 space-y-7">
            <div>
              <h2 className="text-lg font-bold mb-2">Global Headquarters</h2>
              <p>
                2 Canal Park
                Cambridge, MA 02141 <br />
                United States
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Phone / Fax</h2>
              <p>
                <Link href="tel:+2347053554961" className="text-blue-700 underline">+1 888 111 454</Link>
                <br />
                (<Link href="tel:+18884827768" className="text-blue-700 underline">+1 888 482 7768</Link>)
              </p>
              <p className="mt-5">
                <span className="font-semibold">Fax:</span> <Link href="tel:+1 617 812 5820" className="text-blue-700 underline">+1 617 812 5820</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <GlobalContact />
    </main>
  );
}

const contactDetails = [
  {
    icon: <LocalPhoneIcon className="text-[#14C570] text-4xl" />,
    title: "Talk to Sales",
    description:
      "Interested in Pixelcore? Our sales team is here to help you with any inquiries about our eSports services and solutions. Reach out to us for more information and to discuss how we can assist you in achieving your goals.",
    link: "tel:+2347053554961",
    linkText: "+234 705 355 4961",
  },
  {
    icon: <PermMediaIcon className="text-[#14C570] text-4xl" />,
    title: "Media Inquiries",
    description:
      "Are you a journalist or media professional interested in Pixelcore? Our media team is ready to provide you with the latest updates and press materials. Contact us for interviews, press releases, or other media-related inquiries.",
    link: "mailto:media@pixelcore.com",
    linkText: "media@pixelcore.com",
  },
  {
    icon: <EmailIcon className="text-[#14C570] text-4xl" />,
    title: "Email Support",
    description:
      "Need assistance? Our support team is available via email to help you with any questions or technical issues. Don’t hesitate to reach out to us for prompt and reliable support.",
    link: "mailto:support@pixelcore.com",
    linkText: "support@pixelcore.com",
  },
];
