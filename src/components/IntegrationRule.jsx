"use client";

import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";

export default function IntegrationRule() {
  const phases = [
    {
      title: "First 3 Days",
      color: "border-emerald-500 text-emerald-400 bg-emerald-500/10",
      description:
        "Decompressing and adjusting. Your new cat may feel overwhelmed, hide in dark spaces, test the room's boundaries, or temporarily refuse to eat until they feel safe.",
    },
    {
      title: "First 3 Weeks",
      color: "border-teal-500 text-teal-400 bg-teal-500/10",
      description:
        "Settling into the routine. The cat realizes they are safe, begins to accept your daily household schedule, feels secure around their litter box and feeding zone, and starts showing their true personality.",
    },
    {
      title: "First 3 Months",
      color: "border-indigo-500 text-indigo-400 bg-indigo-500/10",
      description:
        "Complete adjustment and bonding. A deep sense of mutual trust is established. Your cat feels entirely secure in their territory, builds a close bond with you, and fully considers your home their own.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20 sm:py-28 border-t border-neutral-200/60 dark:border-neutral-900/50">
      <div className="p-8 sm:p-12 bg-neutral-950 dark:bg-neutral-900 border border-neutral-900 dark:border-neutral-800 rounded-[32px] text-white flex flex-col lg:flex-row items-start justify-between gap-12 relative overflow-hidden group shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-xs flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md w-max">
              Milestone Blueprint
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            The 3-3-3 <br />
            Acclimation Rule
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed font-semibold tracking-wide">
            A reliable timeline framework detailing what to expect during your
            rescue cat's behavioral adjustment phases in their new home.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6 flex-1 max-w-xl relative z-10 w-full"
        >
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-4 border-l border-neutral-800 dark:border-neutral-700 pl-5 relative pb-2 last:pb-0 group/item"
            >
              <div className="absolute w-2 h-2 rounded-full bg-neutral-800 dark:bg-neutral-700 group-hover/item:bg-emerald-500 -left-[5px] top-2 transition-colors duration-300" />
              <div className="flex flex-col gap-1.5">
                <h4
                  className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border w-max ${phase.color}`}
                >
                  {phase.title}
                </h4>
                <p className="text-xs text-neutral-300 font-semibold tracking-wide leading-relaxed mt-1">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
