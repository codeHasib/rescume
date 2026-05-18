"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedPetsGrid({ initialPets }) {
  if (!initialPets || initialPets.length === 0) {
    return (
      <div className="w-full py-12 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
        <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          No featured listings are currently configured in this system layout
          scope.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {initialPets.map((pet) => (
        <div
          key={pet._id}
          className="group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/[0.02] dark:to-emerald-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden">
            <Image
              src={
                pet.image ||
                "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600"
              }
              alt={pet.petName}
              fill
              sizes="(max-w-768px) 50vw, (max-w-1200px) 33vw"
              className="object-cover transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

            <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-neutral-950/60 text-neutral-200 font-extrabold text-[9px] rounded-lg uppercase tracking-widest backdrop-blur-md border border-white/5 shadow-xs">
              {pet.gender}
            </span>
          </div>

          <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4 relative z-10">
            <div className="flex flex-col min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-black text-base sm:text-lg text-neutral-900 dark:text-neutral-50 tracking-tight truncate group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {pet.petName}
                </h3>
                <span className="text-sm font-black text-emerald-500 dark:text-emerald-400 shrink-0 bg-emerald-500/5 dark:bg-emerald-400/5 px-2 py-0.5 rounded-md border border-emerald-500/10">
                  {Number(pet.adoptionFee) === 0
                    ? "Free"
                    : `$${pet.adoptionFee}`}
                </span>
              </div>

              <p className="text-xs text-neutral-400 dark:text-neutral-500 font-bold truncate mt-1">
                {pet.breed} &bull;{" "}
                <span className="text-neutral-500 dark:text-neutral-400">
                  {pet.age}
                </span>
              </p>

              <div className="flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500 font-medium mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
                <span className="opacity-70">📍</span>
                <span className="truncate">{pet.location}</span>
              </div>
            </div>
            <Link
              href={`/pets/${pet._id}`}
              className="relative w-full py-3 text-center bg-neutral-50 dark:bg-neutral-950 hover:text-white dark:hover:text-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs rounded-xl tracking-widest uppercase transition-all duration-300 overflow-hidden group/btn block select-none focus:outline-none"
            >
              <div className="absolute inset-0 bg-neutral-950 dark:bg-white translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />

              <span className="relative z-10 flex items-center justify-center gap-1.5">
                View Details
                <span className="inline-block transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200 text-[10px]">
                  &rarr;
                </span>
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
