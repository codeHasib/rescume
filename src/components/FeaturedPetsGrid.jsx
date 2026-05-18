"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMapPin, FiArrowRight } from "react-icons/fi";

export default function FeaturedPetsGrid({ initialPets }) {
  if (!initialPets || initialPets.length === 0) {
    return (
      <div className="w-full py-16 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
        <p className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold tracking-wide">
          No featured listings are currently configured in this system layout
          scope.
        </p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {initialPets.map((pet) => (
        <motion.div
          key={pet._id}
          variants={cardVariants}
          whileHover={{ y: -6 }}
          className="group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl overflow-hidden flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_24px_48px_-15px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_24px_48px_-15px_rgba(0,0,0,0.4)] hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/[0.01] pointer-events-none" />

          <div className="w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden">
            <Image
              src={
                pet.image ||
                "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600"
              }
              alt={pet.petName}
              fill
              sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
              priority={false}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 via-transparent to-transparent opacity-60" />

            <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-neutral-950/70 text-neutral-200 font-black text-[9px] rounded-lg uppercase tracking-widest backdrop-blur-md border border-white/5 shadow-xs">
              {pet.gender}
            </span>
          </div>

          <div className="p-5 flex flex-col flex-1 justify-between gap-5 relative z-10">
            <div className="flex flex-col min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-black text-lg text-neutral-950 dark:text-neutral-50 tracking-tight truncate group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-200">
                  {pet.petName}
                </h3>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 shrink-0 bg-emerald-500/5 dark:bg-emerald-400/10 px-2.5 py-1 rounded-lg border border-emerald-500/10 dark:border-emerald-400/10 tracking-wide">
                  {Number(pet.adoptionFee) === 0
                    ? "Free"
                    : `$${pet.adoptionFee}`}
                </span>
              </div>

              <p className="text-xs text-neutral-400 dark:text-neutral-500 font-bold truncate mt-1 tracking-wide">
                {pet.breed} &bull;{" "}
                <span className="text-neutral-500 dark:text-neutral-400 font-semibold">
                  {pet.age}
                </span>
              </p>

              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500 font-semibold mt-4 pt-3.5 border-t border-neutral-100 dark:border-neutral-800/60 tracking-wide">
                <FiMapPin className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600 shrink-0" />
                <span className="truncate">{pet.location}</span>
              </div>
            </div>

            <Link
              href={`/pets/${pet._id}`}
              className="relative w-full py-3.5 text-center bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 font-black text-[10px] tracking-widest uppercase rounded-xl border border-neutral-200/80 dark:border-neutral-800 transition-colors duration-300 overflow-hidden group/btn block select-none focus:outline-none"
            >
              <div className="absolute inset-0 bg-neutral-950 dark:bg-white translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />

              <span className="relative z-10 flex items-center justify-center gap-1.5 group-hover/btn:text-white group-hover/btn:dark:text-neutral-950 transition-colors duration-200">
                View Details
                <FiArrowRight className="w-3 h-3 stroke-[3] transform translate-x-0 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
              </span>
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
