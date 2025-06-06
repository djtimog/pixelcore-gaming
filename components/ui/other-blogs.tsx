import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/lib/data";
import clsx from "clsx";

export const OtherBlogCard = ({
  blog,
  className,
}: {
  blog: (typeof blogs)[0];
  className?: string;
}) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <div className={clsx("w-40 cursor-pointer space-y-2", className)}>
        <div className="flex h-52 items-center justify-center overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            width={300}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-[#B6B6B6]">{blog.title}</p>
      </div>
    </Link>
  );
};

const OtherBlogs = ({ activeBlogId }: { activeBlogId: string }) => {
  return (
    <div className="flex space-x-5 overflow-x-auto sm:space-x-7 md:space-x-10">
      {blogs.map((blog) =>
        blog.id !== activeBlogId ? (
          <OtherBlogCard key={blog.id} blog={blog} />
        ) : null,
      )}
    </div>
  );
};

export default OtherBlogs;
