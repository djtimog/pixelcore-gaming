import { SignedIn, SignedOut } from "@clerk/nextjs";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AccountDropdown } from "./account-dropdown";

export default function Auth() {
  return (
    <>
      <SignedOut>
        <Link href="/sign-in">
          <Button size={"sm"}>Sign In</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <AccountDropdown />
      </SignedIn>
    </>
  );
}
