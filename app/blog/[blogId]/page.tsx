"use client";
import OtherBlogs from "@/components/ui/other-blogs";
import BlogSkeleton from "@/components/ui/skeleton/blog-skeleton";
import { blogs } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";


export default function BlogId() {
  const param = useParams();

  const blogId = param.blogId;
  const activeBlog = blogs.find((blog) => blog.id === blogId);

  return (
    <main>
      {activeBlog ? (
        <section>
          <div className="w-full max-h-80 overflow-hidden flex justify-center items-center">
            <Image
              src={activeBlog.image}
              alt={activeBlog.title}
              width={5000}
              height={1000}
              className="w-full object-cover"
            />
          </div>
          <div className="space-y-5 px-7 py-3 sm:px-11 sm:py-5">
            <p className="text-xs mb-3 text-muted-foreground">
              {activeBlog.date}
            </p>
            <div>
              <Link href={activeBlog.link}>
                <h2 className="mb-5 md:mb-7 text-2xl font-bold text-[#14C570]">
                  {activeBlog.title}
                </h2>
              </Link>
              <p className="text-md">{activeBlog.description}</p>
            </div>
          </div>
          <div className="my-10 px-7 sm:px-11">
            <h2 className="mb-5 text-xl font-bold">Other Blogs</h2>
            <OtherBlogs activeBlogId={activeBlog.id} />
          </div>
        </section>
      ) : (
        <BlogSkeleton />
      )}
    </main>
  );
}
