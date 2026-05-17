"use client";

import { useState } from "react";
import { LuEye, LuEyeOff, LuArrowRight, LuMail, LuLock } from "react-icons/lu";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import GoogleAuthBtn from "@/components/GoogleAuthBtn";

export default function SignIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
      } else {
        toast.success("Welcome back to RescuMe!");
        console.log(data);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 font-sans">
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-amber-500/10 p-12 flex-col justify-between relative overflow-hidden select-none border-r border-neutral-200 dark:border-neutral-800">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-amber-400/10 blur-3xl" />

        <Link
          href="/"
          className="font-bold text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 z-10"
        >
          Rescu<span className="text-emerald-500">Me</span>
        </Link>

        <div className="z-10 max-w-sm">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bold text-4xl text-neutral-900 dark:text-neutral-50 mb-4 leading-tight"
          >
            Welcome Back, Pet Lover!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed"
          >
            Log in to manage your adoption requests, update pet listings, and
            connect with waiting animals.
          </motion.p>
        </div>

        <div className="z-10 text-xs text-neutral-400 font-medium">
          &copy; RescuMe Portfolio Project
        </div>
      </div>

      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1.5 text-center lg:text-left">
            <h2 className="font-bold text-2xl tracking-tight text-neutral-900 dark:text-neutral-50">
              Sign In
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Enter your credentials to manage your pet dashboard
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-neutral-400">
                  <LuMail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="paws@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium text-sm transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-neutral-400">
                  <LuLock size={18} />
                </span>
                <input
                  type={isVisible ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium text-sm transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none"
                >
                  {isVisible ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <LuArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
          </div>

          <div className="flex w-full justify-center">
            <GoogleAuthBtn />
          </div>

          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-emerald-500 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
