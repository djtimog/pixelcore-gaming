import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileImage from "@/components/ui/profile-image";
import {
  BadgePlus,
  Bell,
  CalendarCheck2,
  Cog,
  DollarSign,
  Info,
  Link2,
  LinkIcon,
  LogOut,
  Settings,
  TicketSlash,
  UserPen,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

export function AccountDropdown() {
  const { signOut } = useClerk();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="w-10 h-10 p-0 rounded-full"
        >
          <ProfileImage />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile" className="space-x-3 flex w-full">
              <UserPen size={20} />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/notifications" className="space-x-3 flex w-full">
              <Bell size={20} />
              <span>Notification</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings" className="space-x-3 flex w-full">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Link href="/billing" className="space-x-3 flex w-full">
              <DollarSign size={20} />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Info size={20} /> Player Info
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BadgePlus size={20} />
            Create a Team
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite a Friend</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <LinkIcon size={20} />
                  Copy Referral Link
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TicketSlash size={20} />
                  Copy Referral Code
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link2 size={20} />
                  Share...
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CalendarCheck2 size={20} />
          Events
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserRoundCog size={20} />
          Support
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cog size={20} />
          API
        </DropdownMenuItem>
        <DropdownMenuItem>Become an Admin</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ redirectUrl: "/" })}
          className="space-x-3 flex"
        >
          <LogOut size={20} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
