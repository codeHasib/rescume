"use client";

import Image from "next/image";
import Link from "next/link";

export default function DashboardWelcomeClient({ user }) {
  const fallbackLetter = user.name
    ? user.name.charAt(0).toUpperCase()
    : user.email.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Avatar Component */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl relative bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User profile"}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="text-xl sm:text-2xl font-black text-neutral-400 dark:text-neutral-500 tracking-wider select-none">
                {fallbackLetter}
              </span>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              Account Overview
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-50 truncate mt-0.5">
              Welcome back, {user.name || "User"}!
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 font-medium">
              Logged in via{" "}
              <span className="text-neutral-700 dark:text-neutral-300 font-semibold">
                {user.email}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/dashboard/add-pet"
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition-opacity tracking-wider uppercase text-center w-full sm:w-auto"
          >
            Create New Listing
          </Link>
        </div>
      </div>
    </div>
  );
}
