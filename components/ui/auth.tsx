import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import React from "react";

export default function Auth() {
  return (
    <>
      <SignedOut>
        <div className="bg-[#14C570] rounded-lg px-3 py-2 font-medium text-sm cursor-pointer">
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
