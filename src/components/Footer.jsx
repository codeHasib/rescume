"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200/60 dark:border-neutral-900/50 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 items-start pb-12 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group select-none focus:outline-none"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center relative overflow-hidden">
                <Image
                  src={Logo}
                  alt="RescuMe Logo"
                  className="object-contain"
                  width={32}
                  height={32}
                  priority
                />
              </div>
              <p className="font-black text-neutral-950 dark:text-neutral-50 text-lg tracking-tight">
                Rescu
                <span className="text-emerald-500 group-hover:text-emerald-400 transition-colors duration-200">
                  Me
                </span>
              </p>
            </Link>
            <p className="text-xs sm:text-sm max-w-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold tracking-wide">
              Connecting rescue cats with loving permanent homes. Every shelter
              cat deserves a quiet place, a dedicated perch, and a second
              chance.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              Contact & Support
            </h4>
            <address className="not-italic flex flex-col gap-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-semibold tracking-wide">
              <p className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200">
                <a
                  href="mailto:support@resculme.com"
                  className="focus:outline-none"
                >
                  support@resculme.com
                </a>
              </p>
              <p className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200">
                <a href="tel:+1234567890" className="focus:outline-none">
                  +1 (234) 567-890
                </a>
              </p>
              <p className="text-neutral-400 dark:text-neutral-500 leading-relaxed mt-1">
                123 Rescue Way, Suite 100
                <br />
                San Francisco, CA 94103
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-semibold tracking-wide text-neutral-400 dark:text-neutral-500">
          <p>© {currentYear} RescuMe. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-500/5 dark:hover:bg-emerald-400/5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 focus:outline-none"
              aria-label="Follow RescuMe on Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-500/5 dark:hover:bg-emerald-400/5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 focus:outline-none"
              aria-label="Follow RescuMe on Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-500/5 dark:hover:bg-emerald-400/5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 focus:outline-none"
              aria-label="Follow RescuMe on X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
