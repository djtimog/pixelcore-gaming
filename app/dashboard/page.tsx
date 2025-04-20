import { dummyEvents, dummyTeams, Tournaments } from "@/lib/data";
import {
  EventsCarousel,
  TeamCarousel,
} from "@/components/ui/dashboard/carousel";
import { TournamentCard } from "@/components/ui/dashboard/card/tournament";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
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
          Recommended Teams
        </h2>
        <div>
          <TeamCarousel teams={dummyTeams} recommended={true} />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="outlined-text mb-5 text-2xl tracking-wide">
          Top 10 Best Teams
        </h2>
        <div>
          <TeamCarousel teams={dummyTeams} />
        </div>
      </div>

{/* this */}
      <div className="mb-5">
        <div className="flex gap-2 justify-between items-center mb-5 ">
          <h2 className="outlined-text text-2xl tracking-wide truncate">
            All Tournaments
          </h2>

          <Link href="#">
            <Button className="rounded-full border" variant={"ghost"}>
              View All 
              <Trophy /> 
              <span className="hidden lg:block">Tournament</span>
            </Button>
          </Link>
        </div>


        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-5">
          {Tournaments.map((tournament, index) => (
            <TournamentCard key={index} {...tournament} />
          ))}
        </div>
      </div>
    </div>
  );
}
