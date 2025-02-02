import { SignedIn, SignedOut } from "@clerk/nextjs";
import ProfileImage from "@/components/ui/profile-image";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Auth() {
  return (
    <>
      <SignedOut>
        <Link href="/sign-in">
          <Button size={"sm"}>Sign In</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <ProfileImage />
      </SignedIn>
    </>
  );
}
