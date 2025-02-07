"use client";
import OtherBlogs from "@/components/ui/other-blogs";
import { blogs } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <main>
      <section>
        <div className="w-full max-h-80 overflow-hidden flex justify-center items-center">
          <Image
            src={blogs[0].image}
            alt={blogs[0].title}
            width={5000}
            height={1000}
            className="w-full object-cover"
          />
        </div>
        <div className="space-y-5 px-7 py-3 sm:px-11 sm:py-5">
          <p className="text-xs mb-3 text-muted-foreground">{blogs[0].date}</p>
          <div>
            <Link href={blogs[0].link}>
              <h2 className="mb-5 md:mb-7 text-2xl font-bold text-[#14C570]">
                {blogs[0].title}
              </h2>
            </Link>
            <p className="text-md">{blogs[0].description}</p>
          </div>
        </div>
        <div className="my-10 px-7 sm:px-11">
          <h2 className="mb-7 text-lg font-bold">Other Blogs</h2>
          <OtherBlogs activeBlogId={blogs[0].id} />
        </div>
      </section>
    </main>
  );
}
