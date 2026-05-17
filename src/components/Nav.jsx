"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
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
import { usePathname } from "next/navigation";
import Logo from "../../public/images/logo.png";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const theme = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseItems = [
    { label: "Home", path: "/" },
    { label: "All Pets", path: "/pets" },
  ];

  const privateItems = [
    { label: "My Requests", path: "/requests" },
    { label: "Add Pet", path: "/add-pet" },
  ];

  const menuItems = isLoggedIn ? [...baseItems, ...privateItems] : baseItems;

  if (!mounted || !theme) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b border-default-200/50 glass-nav">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 animate-pulse" />
            <div className="w-24 h-5 bg-default-200 rounded-lg animate-pulse" />
          </div>
          <div className="w-8 h-8 rounded-full bg-default-200 animate-pulse" />
        </div>
      </nav>
    );
  }

  const { isDarkMode, toggleTheme } = theme;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-100/80 glass-nav transition-all duration-300">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-default-500 sm:hidden focus:outline-none p-1.5 rounded-xl hover:bg-default-100 transition-colors"
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
            <p className="font-heading font-bold text-foreground text-xl tracking-tight">
              Rescu
              <span className="text-emerald-500 group-hover:text-emerald-400 transition-colors">
                Me
              </span>
            </p>
          </Link>
        </div>

        <ul className="hidden sm:flex items-center gap-1 m-0 p-1 list-none bg-default-100/50 dark:bg-default-50/50 rounded-full border border-default-200/30">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <li key={index} className="relative">
                <Link
                  href={item.path}
                  className={`px-4 py-1.5 font-medium text-sm rounded-full block relative transition-colors duration-200 ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-default-600 hover:text-emerald-600 dark:hover:text-emerald-400"
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
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onPress={toggleTheme}
            className="text-default-500 hover:bg-default-100"
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
          </Button>

          {isLoggedIn ? (
            <div className="relative">
              <Button
                isIconOnly
                variant="flat"
                color="emerald"
                radius="full"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="shadow-sm border border-emerald-500/20"
                aria-label="User Actions"
              >
                <Person size={18} />
              </Button>

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
                      className="absolute right-0 mt-2.5 w-48 rounded-2xl border border-default-100 bg-background p-1.5 shadow-xl z-20 origin-top-right"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-default-700 hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
                      >
                        Dashboard <ChevronRight size={14} />
                      </Link>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsLoggedIn(false);
                        }}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-danger hover:bg-danger-500/10 transition-colors border-t border-default-100 mt-1 pt-2"
                      >
                        Sign Out <ArrowRightToLine size={14} />
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              size="sm"
              color="emerald"
              radius="full"
              className="font-medium px-4 shadow-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
              onClick={() => setIsLoggedIn(true)}
            >
              Sign In
            </Button>
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
            className="sm:hidden absolute top-16 left-0 w-full bg-background/98 backdrop-blur-xl border-b border-default-100 z-40 overflow-hidden shadow-xl"
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
                          : "text-default-700 hover:text-emerald-600 hover:bg-default-100/70"
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
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium"
                    radius="xl"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLoggedIn(true);
                    }}
                  >
                    Sign In
                  </Button>
                </motion.li>
              ) : (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2 border-t border-default-100 mt-2"
                >
                  <button
                    className="w-full flex items-center justify-between text-danger font-medium py-2.5 px-3 rounded-xl hover:bg-danger-500/10 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLoggedIn(false);
                    }}
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
