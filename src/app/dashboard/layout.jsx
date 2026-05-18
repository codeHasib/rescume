"use client";

import { useSession } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isPending && !session) {
      router.push("/auth/signin");
    }
  }, [session, isPending, mounted, router]);

  if (!mounted || isPending) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="w-8 h-8 border-2 border-neutral-300 dark:border-neutral-700 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const navItems = [
    { label: "My Requests", path: "/dashboard/requests" },
    { label: "Add Pet", path: "/dashboard/add-pet" },
    { label: "My Listings", path: "/dashboard/listings" },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8">
        <aside className="hidden lg:block lg:col-span-3">
          <nav className="sticky top-24 flex flex-col gap-1 p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
            <div className="px-3 py-2.5 text-xs font-bold text-neutral-400 uppercase tracking-wider select-none">
              Manage Account
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="block lg:hidden mb-6">
          <nav className="flex gap-1 p-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-x-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <main className="lg:col-span-9 flex flex-col gap-6">{children}</main>
      </div>
    </div>
  );
}
