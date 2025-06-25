import { UserProfile } from "@/app/_components/context/DashboardContextProvider";
import { Info, MessageCircle } from "lucide-react";
import { Button } from "../../button";
import Image from "next/image";

export function HostCard({ host }: { host: UserProfile }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 shadow-sm lg:flex-row lg:items-center">
      <div className="flex items-center gap-2 self-start">
        <Info className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Organized by</span>
      </div>

      <div className="order-last flex-1 lg:order-none">
        <h3 className="text-lg font-semibold">{host.name}</h3>
        <p className="text-sm text-muted-foreground">@{host.username}</p>
        <p className="mt-1 text-sm text-gray-600">
          {host.name} is a verified organizer hosting tournaments on our
          platform.
        </p>
        {host.discordHandle && (
          <p className="mt-1 text-sm">
            <strong>Discord:</strong> {host.discordHandle}
          </p>
        )}
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => alert(`Start chat with ${host.name}`)}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat with Host
        </Button>
      </div>

      <div className="self-start lg:self-center">
        <div className="size-20 overflow-hidden rounded-full">
          <Image
            src={host.imageUrl || "/default-avatar.png"}
            alt={host.name}
            width={80}
            height={80}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
