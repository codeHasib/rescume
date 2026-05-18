"use client";

import { motion } from "framer-motion";
import {
  FiHome,
  FiFeather,
  FiActivity,
  FiShield,
  FiHeart,
} from "react-icons/fi";

export default function PetCareTips() {
  const tips = [
    {
      id: "01",
      title: "Safe Base Camp Setup",
      description:
        "Keep transitions smooth. Designate a quiet, confined room with clear boundaries, a litter box, and hiding spaces during the initial 72 hours.",
      icon: <FiHome className="w-4 h-4 text-emerald-500" />,
    },
    {
      id: "02",
      title: "Dietary Continuity",
      description:
        "Abrupt feeding adjustments can startle sensitive feline digestion. Keep their initial diet consistent with what the shelter provided before slowly changing brands.",
      icon: <FiFeather className="w-4 h-4 text-emerald-500" />,
    },
    {
      id: "03",
      title: "Vertical Enrichment",
      description:
        "Cats thrive on vertical real estate and scratching instincts. Provide dedicated high perches, window seats, and stable scratching posts early on.",
      icon: <FiActivity className="w-4 h-4 text-emerald-500" />,
    },
    {
      id: "04",
      title: "Veterinary Wellness Check",
      description:
        "Schedule an initial validation check-up with a local vet within the first week to seamlessly establish their preventative medical history records.",
      icon: <FiShield className="w-4 h-4 text-emerald-500" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20 sm:py-28 border-t border-neutral-200/60 dark:border-neutral-900/50">
      <div className="flex flex-col gap-2 mb-12 max-w-xl">
        <div className="flex items-center gap-2">
          <FiHeart className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Care Guidelines
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
          Essential Integration Tips
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-semibold tracking-wide leading-relaxed">
          Maintain foundational care structures to ensure a reliable,
          stress-free acclimation cycle for your incoming feline companion.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {tips.map((tip) => (
          <motion.div
            key={tip.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group p-6 bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl flex flex-col gap-5 hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="bg-neutral-50 dark:bg-neutral-950 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 group-hover:bg-emerald-500/5 group-hover:border-emerald-500/10 transition-colors duration-300">
                {tip.icon}
              </span>
              <span className="text-xl font-black text-neutral-200 dark:text-neutral-800 font-mono tracking-tight group-hover:text-emerald-500/20 transition-colors duration-300 select-none">
                {tip.id}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-black text-sm text-neutral-950 dark:text-neutral-50 tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {tip.title}
              </h3>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed font-semibold tracking-wide">
                {tip.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
