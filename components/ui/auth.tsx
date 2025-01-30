import { SignedIn, SignedOut } from "@clerk/nextjs";
import ProfileImage from "@/components/ui/profile-image";

import React from "react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Auth() {
  return (
    <>
      <SignedOut>
        <Link href="/sign-in">
          <Button variant={"outline"} size={"sm"} className="hover:text-[#14C570]">
            <LogIn size={16} />
            Sign In
          </Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <ProfileImage />
      </SignedIn>
    </>
  );
}
