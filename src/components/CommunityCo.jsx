"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiShield } from "react-icons/fi";

export default function CommunitySupport() {
  const networks = [
    {
      title: "Emergency Vet Lines",
      desc: "24/7 priority routing to connected regional veterinary clinics directly through your secure adopter dashboard.",
    },
    {
      title: "Behavioral Support",
      desc: "Access direct consultation lines with certified feline behavioral experts to help navigate post-adoption adjustments.",
    },
    {
      title: "Partner Discounts",
      desc: "Unlock localized community savings on premium cat food, specialized litter setups, and essential care packages.",
    },
    {
      title: "Foster Network",
      desc: "Seamlessly transition your profile settings to open up your home as a temporary safe haven for cats awaiting placement.",
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
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20 sm:py-28 border-t border-neutral-200/60 dark:border-neutral-900/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {networks.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="p-5 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl flex flex-col gap-2 bg-white dark:bg-neutral-900/20 transition-all duration-300 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.2)] hover:border-neutral-300 dark:hover:border-neutral-700 group"
            >
              <h4 className="font-black text-xs text-neutral-950 dark:text-neutral-50 uppercase tracking-widest transition-colors duration-200 group-hover:text-emerald-500 dark:group-hover:text-emerald-400">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold tracking-wide leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FiShield className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Extended Care Ecosystem
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 leading-tight">
            The Co-Op Network Support System
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold tracking-wide">
            Adoption isn’t just a one-time transaction. Our platform links you
            directly with post-placement community networks, ensuring you are
            backed by trusted, professional care resources long after bringing
            your cat home.
          </p>
        </div>
      </div>
    </section>
  );
}
