"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import { EventsCarouselProps, TeamCarouselProps } from "@/lib/placeholder-data";
import { TeamCard } from "./card/team";
import { EventCard } from "./card/event";

export function EventsCarousel({ events }: EventsCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
                  <CardContent className="p-0">
                    <EventCard {...event}/>
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
  );
}

export function TeamCarousel({ teams }: TeamCarouselProps) {
  return (
      <div className="relative w-full h-72 overflow-hidden">
        <Carousel
        opts={{
          align: "start",
        }}
        className="max-w-full absolute top-0 left-0 right-0 z-10"
        >
        <CarouselContent className="flex">
          {teams.map((team, index) => (
          <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
            <div className="p-1 w-min mx-auto">
            <Card className="w-max h-max">
              <CardContent className="flex w-max h-max items-center justify-center p-6">
              <TeamCard {...team} key={index} />
              </CardContent>
            </Card>
            </div>
          </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1" variant="secondary" />
        <CarouselNext className="right-1" variant="secondary" />
        </Carousel>
      </div>

  );
}
