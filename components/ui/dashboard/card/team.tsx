import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamCardProps } from "@/lib/placeholder-data";


export function TeamCard({ name, logoUrl, manager, managerProfileLink }: TeamCardProps) {

  return (
    <div className="">
      <div className="mb-3 flex h-32 w-full items-center justify-center overflow-hidden rounded-md bg-secondary">
        <Image
          src={logoUrl}
          alt={name}
          width={120}
          height={120}
          className="h-auto w-full object-contain"
        />
      </div>

      <h3 className="mb-3 truncate text-center font-bold tracking-wider text-primary">
        {name}
      </h3>

      <div className="mx-auto flex flex-wrap items-center text-xs justify-center">
        <p className="mb-2 mr-2">Created By:</p>
        <Link
          href={managerProfileLink}
          className="mb-2 flex items-center gap-1 text-primary"
        >
          <Avatar className="h-4 w-4">
            <AvatarImage
              src={manager.avatarUrl}
              alt={manager.name}
              className="w-full object-cover"
            />
            <AvatarFallback>
              {manager.name
                .charAt(0)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="truncate">{manager.name}</p>
        </Link>
      </div>
    </div>
  );
}

