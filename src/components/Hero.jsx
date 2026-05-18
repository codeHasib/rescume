"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowRight, FiActivity } from "react-icons/fi";

export default function Hero() {
  const { data, isPending } = useSession();
  const router = useRouter();

  async function handleAdoptNow() {
    if (isPending) return;

    if (data) {
      router.push("/pets");
    } else {
      router.push("/auth/signin");
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center border-b border-neutral-200/60 dark:border-neutral-900/50">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mix-blend-luminosity dark:mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/30 via-neutral-50/80 to-neutral-50 dark:from-neutral-950/40 dark:via-neutral-950/80 dark:to-neutral-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 blur-[140px] rounded-full pointer-events-none select-none" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6 z-10"
      >
        <motion.span
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 text-emerald-600 dark:text-emerald-400 font-black text-[10px] tracking-widest uppercase rounded-full select-none shadow-xs"
        >
          <FiActivity className="w-3 h-3 text-emerald-500 animate-pulse" />
          Find Your Perfect Companion
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 max-w-3xl leading-[1.05] sm:leading-[1.02]"
        >
          Rescuing Lives, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500">
            Simplifying Adoption.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed font-semibold tracking-wide"
        >
          Connect directly with local listings, track open applications, and
          guide shelter animals into structural care through our unified
          matching grid.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 pt-6 w-full justify-center"
        >
          <motion.button
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdoptNow}
            disabled={isPending}
            className="group relative px-9 py-4 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-xs rounded-2xl tracking-widest uppercase overflow-hidden shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-neutral-950/20 transition-all duration-200 focus:outline-none select-none disabled:opacity-50 disabled:pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-200">
              {isPending ? "Connecting Session..." : "Adopt Now"}
              {!isPending && (
                <FiArrowRight className="w-3.5 h-3.5 stroke-[3] transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
              )}
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none"
      >
        <span className="text-[9px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          Explore Grid
        </span>
        <div className="w-[18px] h-[28px] rounded-full border-2 border-neutral-300 dark:border-neutral-800 flex justify-start items-start p-1">
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600"
          />
        </div>
      </motion.div>
    </section>
  );
}
