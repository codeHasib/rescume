"use client";

import Image from "next/image";

export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      petName: "Milo",
      location: "Chittagong",
      quote:
        "Milo completely transformed our remote working space. He brings a balanced routine and so much clarity into our busy architecture projects.",
      avatar:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200",
    },
    {
      id: 2,
      petName: "Luna",
      location: "Dhaka",
      quote:
        "Finding Luna through a unified digital grid made verifying vaccination logs simple. She’s healthy, active, and loves our minimal living room.",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100 dark:border-neutral-900">
      <div className="flex flex-col gap-2 mb-12">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          Verified Outcomes
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
          Real Connections, Documented
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-md">
          Read updates from verified environments where placement tracking has
          successfully completed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="group relative p-6 bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800/80 rounded-3xl flex flex-col justify-between gap-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)] hover:border-neutral-300 dark:hover:border-neutral-700"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic font-medium relative z-10">
              &ldquo;{story.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 relative z-10">
              <div className="w-11 h-11 rounded-2xl relative overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shrink-0">
                <Image
                  src={story.avatar}
                  alt={story.petName}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-sm text-neutral-900 dark:text-neutral-50 truncate">
                  {story.petName}
                </h4>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider mt-0.5 truncate">
                  Adopted in {story.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
