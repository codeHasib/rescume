"use client";

import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log exception payload to monitoring infrastructure
    console.error("System Error Catch:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-6 animate-fade-in">
        {/* Runtime Exception Icon Block */}
        <div className="relative w-24 h-24 bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/10 dark:border-rose-500/20 rounded-2xl flex items-center justify-center shadow-xs">
          <span className="text-4xl select-none animate-bounce">🙀</span>
          <div className="absolute inset-0 border border-dashed border-rose-500/30 rounded-2xl animate-spin [animation-duration:10s]" />
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
            System Tangle Encountered
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed font-medium">
            Something startled our background workers. We couldn't parse the
            requested animal environment layer properly.
          </p>
          {error?.message && (
            <div className="mt-2 p-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 rounded-xl max-w-sm mx-auto text-left font-mono text-[10px] text-neutral-400 dark:text-neutral-500 break-all select-all">
              Exception: {error.message}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs pt-2">
          <button
            onClick={() => window.location.replace("/")}
            className="w-full py-2.5 text-xs font-bold text-center border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors select-none focus:outline-none"
          >
            Leave Terminal
          </button>
          <button
            onClick={() => reset()}
            className="w-full py-2.5 text-xs font-bold text-center bg-rose-500 text-white rounded-xl shadow-md hover:bg-rose-600 transition-colors tracking-wide uppercase select-none focus:outline-none"
          >
            Re-Try Fetch
          </button>
        </div>
      </div>
    </div>
  );
}
