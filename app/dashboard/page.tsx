import { dummyEvents, Tournaments } from "@/lib/data";
import { TournamentCard } from "@/components/ui/dashboard/tournament-card";
import { EventsCarousel } from "@/components/ui/dashboard/carousel";

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

      <div>
        <h2 className="outlined-text mb-5 text-2xl tracking-wide">
          Recommended Tournament
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Tournaments.map((tournament, index) => (
            <TournamentCard key={index} {...tournament} />
          ))}
        </div>
      </div>
    </div>
  );
}
