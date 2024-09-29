"use client";

<<<<<<< HEAD:pvd_webapp/src/app/page.tsx
import React, { useEffect, useState } from 'react'
=======
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
>>>>>>> upstream/main:pvd_client/app/page.tsx

function index() {

  const [message, setMessage] = useState("loading...")

    useEffect(() => {
        fetch("http://localhost:8080/api/home").then(
        response => response.json()
        ).then(
          data => {
            console.log(data)
            setMessage(data.message)
          }
          // Random comment for things
        )
    },[])
    return (
        <div>
            <h1>{message}</h1>
        </div>
        
    )
}

export default index