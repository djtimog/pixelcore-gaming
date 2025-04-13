"use client"

import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "../button"
import { BookOpen } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { EventsCarouselProps } from "@/lib/placeholder-data"

export function EventsCarousel({ events }: EventsCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }))
  const isMobile = useIsMobile()

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const getSliceNumber = () => (isMobile ? 15 : 30)

  return (
    <div className="mb-5">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="relative flex max-h-96 w-full items-center justify-center overflow-hidden rounded-lg p-0">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      width={5000}
                      height={1000}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <div className="absolute bottom-0 top-0 z-10 flex h-full w-full items-center justify-start bg-white bg-opacity-30 px-10 dark:bg-secondary dark:opacity-70">
                      <div className="w-full max-w-md">
                        <h3 className="mb-1 text-2xl font-bold tracking-widest md:mb-3 truncate">
                          {event.title}
                        </h3>
                        <p className="mb-3 text-sm md:mb-7">
                          {event.description
                            .split(" ")
                            .slice(0, getSliceNumber())
                            .join(" ")}
                          ...
                        </p>
                        <Link href={event.readMoreLink}>
                          <Button>
                            Read More <BookOpen />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-1 mx-2" variant="secondary" />
        <CarouselNext className="right-1 mx-2" variant="secondary" />
      </Carousel>

      <div className="mt-5 flex items-center justify-center">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`mx-1 h-2 w-2 cursor-pointer rounded-full ${
              current === index + 1 ? "bg-primary" : "bg-gray-400"
            }`}
            onClick={() => api?.scrollTo(index)}
          ></div>
        ))}
      </div>
    </div>
  )
}
