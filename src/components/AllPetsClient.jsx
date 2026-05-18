"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AllPetsClient({ initialPets, isLoggedIn }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleActionIntercept = (targetUrl) => {
    if (!isLoggedIn) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(targetUrl)}`);
    } else {
      startTransition(() => {
        router.push(targetUrl);
      });
    }
  };

  const filteredPets = initialPets.filter((pet) => {
    const matchesSearch =
      pet.petName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.location?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === "all") return matchesSearch;
    return (
      matchesSearch &&
      pet.species?.toLowerCase() === activeCategory.toLowerCase()
    );
  });

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in">
      {/* Search & Category Filter Control Hub */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
        <input
          type="text"
          placeholder="Search by name, breed, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-xs px-4 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors font-medium"
        />

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {["all", "dog", "cat", "other"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all ${
                activeCategory === cat
                  ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-neutral-950 dark:border-white"
                  : "bg-white dark:bg-neutral-950 text-neutral-500 border-neutral-200 dark:border-neutral-800 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Execution Layer */}
      {filteredPets.length === 0 ? (
        <div className="w-full py-16 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
            No animal inventory nodes match your current structural query
            criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPets.map((pet) => (
            <div
              key={pet._id}
              className="group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Media Section */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-neutral-950/60 text-neutral-200 font-extrabold text-[9px] rounded-lg uppercase tracking-widest backdrop-blur-md border border-white/5">
                  {pet.gender}
                </span>
              </div>

              {/* Metadata Context Frame */}
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
                    <span>📍</span>
                    <span className="truncate">{pet.location}</span>
                  </div>
                </div>

                {/* Double Interactive Trigger Rows */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => handleActionIntercept(`/pets/${pet._id}`)}
                    className="py-2.5 text-center bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-[11px] rounded-xl tracking-wider uppercase transition-colors focus:outline-none"
                  >
                    Details
                  </button>
                  <button
                    onClick={() =>
                      handleActionIntercept(`/pets/${pet._id}/adopt`)
                    }
                    className="relative py-2.5 text-center bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-[11px] rounded-xl tracking-wider uppercase overflow-hidden group/btn focus:outline-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 group-hover/btn:text-white transition-colors">
                      Adopt Now
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
