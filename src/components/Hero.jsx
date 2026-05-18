"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Hero() {

  const { data, isPending } = useSession();
  async function handleAdoptNow() {
    if (isPending) {
      return <p> Loading.... </p>;
    }
    if (data) {
      redirect("/all-pets");
    } else {
      redirect("/auth/signin");
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-neutral-950 py-20 sm:py-28 lg:py-36 border-b border-neutral-100 dark:border-neutral-900 flex flex-col items-center justify-center">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 blur-3xl rounded-full pointer-events-none select-none" />

      <div className="relative max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6 z-10">
        <span className="px-3 py-1 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] tracking-widest uppercase rounded-full select-none animate-fade-in">
          Find Your Perfect Companion
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 max-w-3xl leading-[1.1] sm:leading-[1.05]">
          Rescuing Lives, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">
            Simplifying Adoption.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed font-medium">
          Connect directly with local listings, track open applications, and
          guide shelter animals into structural care through our unified
          matching grid.
        </p>

        <div className="flex items-center gap-3 pt-4 w-full justify-center">
          <button
            onClick={handleAdoptNow}
            className="group relative px-8 py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-xs rounded-2xl tracking-widest uppercase overflow-hidden shadow-lg transition-transform duration-200 active:scale-98 focus:outline-none select-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-200">
              Adopt Now
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                &rarr;
              </span>
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 dark:opacity-30 select-none animate-bounce [animation-duration:2.5s]">
        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
          Explore Grid
        </span>
        <span className="text-xs text-neutral-400">↓</span>
      </div>
    </section>
  );
}
