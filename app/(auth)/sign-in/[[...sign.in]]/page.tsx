import { SignIn } from '@clerk/nextjs'
import React from 'react'
import style from '@/app/(auth)/auth.module.scss'

export default function page() {
  return (
    <section className={`${style.authBgImage} `}>
      <div className="w-full h-full bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 py-10">
        <div className="mx-auto max-w-max">
          <SignIn />
        </div>
      </div>
    </section>
  )
}
