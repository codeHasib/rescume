"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";

export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      petName: "Milo",
      location: "Chittagong",
      quote:
        "Milo completely transformed our remote working space. He brings a balanced routine and so much clarity into our busy architecture projects.",
      avatar:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300",
    },
    {
      id: 2,
      petName: "Luna",
      location: "Dhaka",
      quote:
        "Finding Luna through a unified digital grid made verifying vaccination logs simple. She’s healthy, active, and loves our minimal living room.",
      avatar:
        "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=300",
    },
    {
      id: 3,
      petName: "Oliver",
      location: "Sylhet",
      quote:
        "The dynamic workflow allowed us to sync with the shelter effortlessly. Oliver settled in immediately and rules his new indoor kingdom.",
      avatar:
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=300",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
          <FiMessageSquare className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Verified Outcomes
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
          Real Connections, Documented
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-semibold tracking-wide leading-relaxed">
          Read updates from verified environments where placement tracking has
          successfully completed.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stories.map((story) => (
          <motion.div
            key={story.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group relative p-6 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-3xl flex flex-col justify-between gap-8 transition-shadow duration-300 hover:shadow-[0_24px_48px_-15px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_24px_48px_-15px_rgba(0,0,0,0.3)] hover:border-neutral-300 dark:hover:border-neutral-700"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/[0.01] pointer-events-none rounded-3xl" />

            <div className="relative">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-semibold tracking-wide relative z-10">
                &ldquo;{story.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 relative z-10">
              <div className="w-11 h-11 rounded-xl relative overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 shrink-0">
                <Image
                  src={story.avatar}
                  alt={story.petName}
                  fill
                  sizes="44px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-sm text-neutral-950 dark:text-neutral-50 truncate">
                  {story.petName}
                </h4>
                <p className="text-[9px] text-neutral-400 dark:text-neutral-500 font-black uppercase tracking-widest mt-0.5 truncate">
                  Adopted in {story.location}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
