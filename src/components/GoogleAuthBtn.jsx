"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function GoogleAuthBtn() {
  const [isConnecting, setIsConnecting] = useState(false);

  async function handleSignIn() {
    setIsConnecting(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Failed to connect with Google");
      setIsConnecting(false);
    }
  }

  return (
    <button
      type="button"
      disabled={isConnecting}
      onClick={handleSignIn}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-200 font-semibold text-sm transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isConnecting ? (
        <div className="w-5 h-5 border-2 border-neutral-300 dark:border-neutral-600 border-t-neutral-600 dark:border-t-neutral-200 rounded-full animate-spin" />
      ) : (
        <>
          <FaGoogle className="text-red-500 text-base" />
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
}
