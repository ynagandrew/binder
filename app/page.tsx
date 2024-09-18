"use client";
import Image from "next/image";
import React from "react";
import NavBar from "@/app/navBar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-left min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]">
      <header className="row-start-1 flex gap-6 flex-wrap items-center justify-items-left">
        <h1>
          binder
        </h1>
      </header>

      <nav className="row-start-2 flex-wrap align-top items-start justify-center">
        <NavBar></NavBar>
      </nav>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; {new Date().getFullYear()} binder. all rights reserved.
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          readme
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          a ynag project.
        </a>
      </footer>
    </div>
  );
}
