import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamCardProps } from "@/lib/placeholder-data";
import { Button } from "../../button";

export function TeamCard({
  team,
  recommended,
}: {
  team: TeamCardProps;
  recommended: boolean;
}) {
  return (
    <div className="">
      <div className="mb-3 flex h-32 w-full items-center justify-center overflow-hidden rounded-md bg-secondary">
        <Image
          src={team.logoUrl}
          alt={team.name}
          width={120}
          height={120}
          className="h-auto w-full object-contain"
        />
      </div>

      <h3 className="mb-3 truncate text-center font-bold tracking-wider text-primary">
        {team.name}
      </h3>

      <div className="mx-auto flex flex-wrap items-center justify-center text-xs">
        <p className="mb-2 mr-2">Created By:</p>
        <Link
          href={team.managerProfileLink}
          className="mb-2 flex items-center gap-1 text-primary"
        >
          <Avatar className="h-4 w-4">
            <AvatarImage
              src={team.manager.avatarUrl}
              alt={team.manager.name}
              className="w-full object-cover"
            />
            <AvatarFallback>
              {team.manager.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="truncate">{team.manager.name}</p>
        </Link>
      </div>

      <p className="truncate text-center text-xs text-gray-500">
       {team.game? team.game: "Call Of Duty"}
      </p>

      {recommended && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <Link href="">
            <Button size="sm">Apply Now</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
