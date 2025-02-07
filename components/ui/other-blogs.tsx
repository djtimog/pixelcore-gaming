import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/lib/data";

const OtherBlogCard = ({ blog }: { blog: (typeof blogs)[0] }) => {
  return (
    <Link href={blog.link}>
      <div className="w-min space-y-2 cursor-pointer">
        <div className="w-40 h-52 flex items-center justify-center overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            width={300}
            height={300}
            className="object-contain w-full"
          />
        </div>
        <p className="text-[#B6B6B6]">{blog.title}</p>
      </div>
    </Link>
  );
};

const OtherBlogs = (
  {activeBlogId}:{activeBlogId:string}
) => {
  return (
    <div className="flex space-x-5 sm:space-x-7 md:space-x-10 overflow-x-auto">
      {blogs.map((blog)=>(
        blog.id !== activeBlogId
          ?
          <OtherBlogCard key={blog.id} blog={blog} />
          :null
      ))
      }
    </div>
  );
};

export default OtherBlogs;
