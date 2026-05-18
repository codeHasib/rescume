"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiClock, FiHeart, FiTarget, FiArrowRight } from "react-icons/fi";

export default function WhyAdoptCats() {
  const catBenefits = [
    {
      icon: <FiClock className="w-4 h-4 text-emerald-500" />,
      title: "Low-Maintenance Companionship",
      desc: "Cats adapt perfectly to compact modern living spaces. They are independent by nature, clean themselves meticulously, and seamlessly fit around a busy professional schedule without requiring outdoor walking routines.",
    },
    {
      icon: <FiHeart className="w-4 h-4 text-emerald-500" />,
      title: "Natural Stress Relief",
      desc: "Studies show that interacting with a cat can lower blood pressure and reduce anxiety. Their calming presence and soothing purrs offer an ideal companion to help you unwind after intense, high-focus working hours.",
    },
    {
      icon: <FiTarget className="w-4 h-4 text-emerald-500" />,
      title: "Independent & Intelligent",
      desc: "With fine-tuned instincts and quiet curiosity, cats manage their own daily routines. They provide steady, affectionate companionship without demanding constant active attention, making them the ultimate indoor partners.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20 sm:py-28 border-t border-neutral-200/60 dark:border-neutral-900/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Feline Companionship
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 leading-tight">
              Why Adopt <br />a Shelter Cat?
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold tracking-wide">
            Shelters house thousands of rescue cats ranging from energetic
            kittens to calm, mature adults. Adopting a cat not only saves a
            life, but introduces an affectionate, peaceful dynamic to your home
            that perfectly respects your space and focus.
          </p>

          <div className="pt-2">
            <Link
              href="/pets?type=cat"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-[10px] tracking-widest uppercase rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
            >
              View Available Cats
              <FiArrowRight className="w-3.5 h-3.5 stroke-[3] transform translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 flex flex-col gap-4"
        >
          {catBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="p-5 bg-white dark:bg-neutral-900/40 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl flex gap-4 items-start group hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-lg shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                {benefit.icon}
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <h3 className="font-black text-sm text-neutral-950 dark:text-neutral-50 tracking-tight transition-colors duration-200 group-hover:text-emerald-500 dark:group-hover:text-emerald-400">
                  {benefit.title}
                </h3>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed font-semibold tracking-wide">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
