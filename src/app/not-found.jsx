"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-6 animate-fade-in">
        {/* Playful Animal Graphic Placeholder / Icon */}
        <div className="relative w-24 h-24 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center justify-center shadow-inner group">
          <span className="text-4xl select-none group-hover:scale-110 transition-transform duration-200">
            🐾
          </span>
          <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 bg-rose-500 text-white font-black text-[9px] rounded-md uppercase tracking-wider shadow-xs">
            Lost
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
            Track Post-Match Terminated
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed font-medium">
            The profile track, directory path, or pet listing index you are
            seeking seems to have strayed off the grid.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs pt-2">
          <button
            onClick={() => router.push("/")}
            className="w-full py-2.5 text-xs font-bold text-center border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors select-none focus:outline-none"
          >
            Go Home
          </button>
          <Link
            href="/pets"
            className="w-full py-2.5 text-xs font-bold text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-md hover:opacity-95 transition-opacity tracking-wide uppercase select-none focus:outline-none"
          >
            Explore Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
