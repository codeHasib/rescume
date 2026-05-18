"use client";

import Image from "next/image";

export default function StaticMarketingSections() {
  const successStories = [
    {
      id: 1,
      petName: "Milo",
      tag: "Adopted in Chittagong",
      quote: "Milo completely transformed our remote working space. He brings a balanced routine and so much clarity into our busy architecture projects.",
      avatar: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200",
    },
    {
      id: 2,
      petName: "Luna",
      tag: "Adopted in Dhaka",
      quote: "Finding Luna through a unified digital grid made verifying vaccination logs simple. She’s healthy, active, and loves our minimal living room.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-24 py-16 sm:py-28 max-w-6xl mx-auto px-4 border-t border-neutral-100 dark:border-neutral-900">
      
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            The Core Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            Why Choose <br />Adoption Over Stores
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
            Shelters are filled with remarkable, deeply loving animals waiting for a structured environment. When you adopt, you break the cycle of commercial breeding grids and give a companion a genuine home layout.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800 rounded-3xl flex flex-col gap-3 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700">
            <span className="text-2xl select-none">🩺</span>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-50">Fully Screened Logs</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
              Every profile comes with accessible data records containing clear vaccination tracking and direct medical lineage history.
            </p>
          </div>

          <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800 rounded-3xl flex flex-col gap-3 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700">
            <span className="text-2xl select-none">💎</span>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-50">No Hidden Costs</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
              Our framework values functional transparency. Adoption fees directly offset operational matching costs without retail markups.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <span className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">Verified Outcomes</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">Real Connections, Documented</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories.map((story) => (
            <div 
              key={story.id} 
              className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800/80 rounded-3xl flex flex-col justify-between gap-6 shadow-xs group transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic font-medium">
                &ldquo;{story.quote}&rdquo;
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                <div className="w-10 h-10 rounded-xl relative overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shrink-0">
                  <Image src={story.avatar} alt={story.petName} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div>
                  <h4 className="font-black text-xs text-neutral-900 dark:text-neutral-50">{story.petName}</h4>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider mt-0.5">{story.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}