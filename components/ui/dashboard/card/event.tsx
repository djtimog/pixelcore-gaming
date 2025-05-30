'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../../button";
import { BookOpen } from "lucide-react";
import { EventCardProps } from "@/lib/placeholder-data";
import { getSliceNumber } from "@/lib/get-slice-number";
import { useIsMobile } from "@/hooks/use-mobile";

export function EventCard({   title,
    description,
    imageUrl,
    readMoreLink}: EventCardProps) {

      const isMobile = useIsMobile()
  return (
    <div className="relative flex max-h-96 w-full items-center justify-center overflow-hidden rounded-lg p-0">
      <Image
        src={imageUrl}
        alt={title}
        width={5000}
        height={1000}
        className="h-full w-full rounded-lg object-cover"
      />
      <div className="absolute bottom-0 top-0 z-10 flex h-full w-full items-center justify-start bg-white bg-opacity-30 px-10 dark:bg-secondary dark:opacity-70">
        <div className="w-full max-w-md">
          <h3 className="mb-1 truncate text-2xl font-bold tracking-widest md:mb-3">
            {title}
          </h3>
          <p className="mb-3 text-sm md:mb-7">
            {description.split(" ").slice(0, getSliceNumber(isMobile)).join(" ")}
            ...
          </p>
          <Link href={readMoreLink}>
            <Button>
              Read More <BookOpen />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
