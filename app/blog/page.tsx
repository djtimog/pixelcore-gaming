"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OtherBlogCard } from "@/components/ui/other-blogs";
import { blogs } from "@/lib/data";

import { useState } from "react";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<typeof blogs>(blogs);

  const handleSearch = () => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredBlogs(filtered);
  };

  return (
    <main>
      <section className="p-10">
        <h2 className="outlined-text mb-7 text-center text-3xl tracking-wide">
          All Blogs
        </h2>
        <div className="mb-5 flex w-full gap-5 px-5">
          <Input
            type="text"
            placeholder="Search tournament by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <div className="grid grid-cols-2 gap-10 p-5 sm:grid-cols-3 sm:p-7 md:grid-cols-4 md:p-10 lg:grid-cols-5 lg:p-12 xl:grid-cols-5">
          {filteredBlogs.map((blog) => (
            <OtherBlogCard key={blog.id} blog={blog} className="w-full" />
          ))}
        </div>
      </section>
    </main>
  );
}
