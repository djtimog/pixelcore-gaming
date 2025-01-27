import { SignUp } from "@clerk/nextjs";
import React from "react";
import style from "@/app/(auth)/auth.module.scss";

export default function page() {
  return (
    <main className={`${style.authBgImage} `}>
      <div className="w-full h-full bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 py-10">
        <div className="m-auto max-w-max">
          <SignUp />
        </div>
      </div>
    </main>
  );
}
