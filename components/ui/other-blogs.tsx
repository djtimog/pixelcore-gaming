import React from "react";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    id: "12345-543-25637",
    title: "PUBG Mobile Pro League - South Asia Spring 2022",
    date: "17-12-2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. re et dolore magna aliqua. re et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. re et dolore magna aliqua. re et dolore magna aliqua. ",
    image: "/blog/active-blog.svg",
    link: "/blog",
  },
  {
    id: "12345-543-25612",
    title: "PUBG Mobile Club Open - Fall Split 2021: Nepal",
    date: "17-12-2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. re et dolore magna aliqua. re et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. re et dolore magna aliqua. re et dolore magna aliqua. ",
    image: "/blog/other-blog-1.png",
    link: "/blog/12345-543-25612",
  },
  {
    id: "12345-543-25154",
    title: "PUBG Mobile Club Open - Spring Split 2021: Nepal",
    date: "17-12-2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. re et dolore magna aliqua. re et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. re et dolore magna aliqua. re et dolore magna aliqua. ",
    image: "/blog/other-blog-2.png",
    link: "/blog/12345-543-25154",
  },
  {
    id: "12345-543-22354",
    title: "PUBG Mobile Pro League - South Asia Season 2",
    date: "17-12-2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. re et dolore magna aliqua. re et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. re et dolore magna aliqua. re et dolore magna aliqua. ",
    image: "/blog/other-blog-3.png",
    link: "/blog/12345-543-22354",
  },
];

const OtherBlogCard = ({ blog }: { blog: (typeof blogs)[0] }) => {
  return (
    <Link href={blog.link}>
      <div className="w-40 h-52">
        <div>
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

const OtherBlogs = () => {
  return (
    <div className="flex overflow-x-auto md:overflow-x-hidden md:flex-wrap gap-8 md:gap-4 px-10 pb-3">
      {/* {blogs.map} */}
    </div>
  );
};

export default OtherBlogs;
