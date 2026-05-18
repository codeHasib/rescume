"use client";

import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Person,
  Bars,
  Xmark,
  ChevronRight,
  ArrowRightToLine,
} from "@gravity-ui/icons";
import { useTheme } from "@/context/useThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import Logo from "../../public/images/logo.png";
import { useSession, authClient } from "@/lib/auth-client";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const theme = useTheme();
  const pathname = usePathname();
  const { data: session, isPending, error } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = !!session;

  const baseItems = [
    { label: "Home", path: "/" },
    { label: "All Pets", path: "/pets" },
  ];

  const privateItems = [
    { label: "My Requests", path: "/dashboard/requests" },
    { label: "Add Pet", path: "/dashboard/add-pet" },
  ];

  const menuItems = isLoggedIn ? [...baseItems, ...privateItems] : baseItems;

  async function handleSignOut() {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    await authClient.signOut();
    window.location.href = "/";
  }

  if (!mounted || isPending || !theme) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 animate-pulse" />
            <div className="w-24 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
          </div>
          <div className="w-5 h-5 border-2 border-neutral-300 dark:border-neutral-700 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      </nav>
    );
  }

  const { isDarkMode, toggleTheme } = theme;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md transition-all duration-300">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-neutral-500 sm:hidden focus:outline-none p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <Xmark size={20} /> : <Bars size={20} />}
          </motion.button>

          <Link
            href="/"
            className="flex items-center gap-2.5 group select-none"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
            >
              <Image
                src={Logo}
                alt="RescuMe Logo"
                className="object-contain"
                width={36}
                height={36}
                priority
              />
            </motion.div>
            <p className="font-bold text-neutral-900 dark:text-neutral-50 text-xl tracking-tight">
              Rescu
              <span className="text-emerald-500 group-hover:text-emerald-400 transition-colors">
                Me
              </span>
            </p>
          </Link>
        </div>

        <ul className="hidden sm:flex items-center gap-1 m-0 p-1 list-none bg-neutral-100/60 dark:bg-neutral-900/60 rounded-full border border-neutral-200/50 dark:border-neutral-800/50">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <li key={index} className="relative">
                <Link
                  href={item.path}
                  className={`px-4 py-1.5 font-medium text-sm rounded-full block relative transition-colors duration-200 ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDesktopTab"
                      className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-500 dark:text-neutral-400 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-none transition-colors"
            aria-label="Toggle Theme Mode"
          >
            <motion.div
              key={isDarkMode ? "sun" : "moon"}
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full shadow-sm hover:bg-emerald-500/20 transition-colors focus:outline-none"
                aria-label="User Actions"
              >
                <Person size={18} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-48 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1.5 shadow-xl z-20 origin-top-right"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        Dashboard <ChevronRight size={14} />
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors border-t border-neutral-100 dark:border-neutral-800 mt-1 pt-2 focus:outline-none"
                      >
                        Sign Out <ArrowRightToLine size={14} />
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-xs font-semibold px-4 py-2 rounded-full shadow-md bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-95 transition-opacity"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="sm:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 z-40 overflow-hidden shadow-xl"
          >
            <ul className="flex flex-col gap-1 p-5 list-none m-0">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <motion.li
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.04 }}
                    key={index}
                  >
                    <Link
                      className={`w-full text-base py-2.5 px-3 block font-medium rounded-xl transition-all ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                          : "text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                      }`}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}

              {!isLoggedIn ? (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4"
                >
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex justify-center text-center py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm rounded-xl shadow-md"
                  >
                    Sign In
                  </Link>
                </motion.li>
              ) : (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2 border-t border-neutral-200 dark:border-neutral-800 mt-2"
                >
                  <button
                    className="w-full flex items-center justify-between text-red-500 font-semibold py-2.5 px-3 rounded-xl hover:bg-red-500/10 transition-colors focus:outline-none"
                    onClick={handleSignOut}
                  >
                    Sign Out <ArrowRightToLine size={16} />
                  </button>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
