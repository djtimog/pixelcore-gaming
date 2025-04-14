import { dummyEvents, dummyTeams, Tournaments } from "@/lib/data";
import {
  EventsCarousel,
  TeamCarousel,
} from "@/components/ui/dashboard/carousel";
import { TournamentCard } from "@/components/ui/dashboard/card/touranament";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="mb-10">
        <h2 className="outlined-text mb-5 text-3xl tracking-widest">
          Upcoming Events
        </h2>
        <div className="flex items-center justify-center">
          <EventsCarousel events={dummyEvents} />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="outlined-text mb-5 text-2xl tracking-wide">
          Recommended Tournament
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Tournaments.map((tournament, index) => (
            <TournamentCard key={index} {...tournament} />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="outlined-text mb-5 text-2xl tracking-wide">
          Top 10 Teams
        </h2>
        <div>
          <TeamCarousel teams={dummyTeams} />
        </div>
      </div>

      <div className="mb-5">
        <h2 className="outlined-text mb-5 text-2xl tracking-wide">
          All Tournaments
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-5">
          {Tournaments.map((tournament, index) => (
            <TournamentCard key={index} {...tournament} />
          ))}
        </div>
        <Link href="#">
          <Button className="rounded-lg w-full">
            View All 
            <span className="hidden sm:block">Tournament</span>
            <Trophy /> 
          </Button>
        </Link>
      </div>
    </div>
  );
}
