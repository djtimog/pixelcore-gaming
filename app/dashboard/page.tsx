import { DollarSign, Gamepad2, Info, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <div>
        <h2 className="mb-5 text-2xl">Recommended Tournament</h2>
        <div className="flex gap-7 overflow-x-scroll py-5">

        <div>
          <div className="mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 hover:border-2">
            <Image
              src="/fallback-tournament.jpg"
              alt="tournament"
              width="200"
              height="200"
              className="w-full object-cover"
            />
          </div>
          <div className="space-y-1 mb-3">

            <div className="flex items-center justify-between">
              <h3 className="text-md truncate font-bold text-primary">
                Africa Codm Eu
              </h3>
              <span className="flex text-xs text-primary">
                <DollarSign size={16} strokeWidth={1} className="mx-1" />
                10000
              </span>
            </div>
            <div className="flex items-center justify-between">

              <p className="flex items-center gap-2 truncate text-sm">
                <Gamepad2 size={16} className="text-primary" />
                Call of Duty Mobile (CODM)
              </p>
              <span className="flex text-xs text-primary">
                <UsersRound size={16} strokeWidth={1} className="mx-1" /> 30
              </span>
            </div>

            <p className="flex gap-3 truncate text-sm text-gray-500">
              <span className="font-bold text-primary">3:27 PM</span>
              Nov 28, 2025
            </p>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Hosted by: <Link href="#" className="text-primary">John Doe</Link>
              </p>

              <Link
                href="#"
                className="flex items-center gap-2 text-xs text-primary"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size="16" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        <h6 className="font-semibold">Rules</h6>
                        <ol>
                          <li>Do not kill your teammates</li>
                          <li>Do not use cheats or hacks</li>
                        </ol>
                        <p className="underline">Click to Learn More</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                Details
              </Link>
            </div>
          </div>

          <Button className="w-full rounded-lg">Apply Now</Button>

        </div>

        </div>
      </div>
    </div>
  );
}
