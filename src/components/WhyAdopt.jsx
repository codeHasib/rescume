"use client";

import Link from "next/link";

export default function WhyAdoptCats() {
  const catBenefits = [
    {
      icon: "🧠",
      title: "Low-Maintenance Companionship",
      desc: "Cats adapt perfectly to compact modern living spaces. They are independent by nature, clean themselves meticulously, and don't require outdoor walking routines.",
    },
    {
      icon: "❤️",
      title: "Natural Stress Relief",
      desc: "Studies show that the frequency of a cat's purr can lower blood pressure and reduce anxiety. Their presence offers a calming anchor after long development sprints.",
    },
    {
      icon: "🎯",
      title: "Built-in Pest Control",
      desc: "With fine-tuned predatory instincts, cats naturally keep your residential perimeter free of insects and rodents, acting as a quiet, automated background worker.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100 dark:border-neutral-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
              Feline Integration
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
              Why Adopt <br />a Shelter Cat?
            </h2>
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
            Shelters house thousands of cats ranging from energetic kittens to
            disciplined seniors. Adopting a cat not only saves a life but
            introduces a quiet, affectionate dynamic to your household grid that
            respects your focused working hours.
          </p>

          <div className="pt-2">
            <Link
              href="/pets?type=cat"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs rounded-xl tracking-widest uppercase transition-transform active:scale-98"
            >
              View Available Cats &rarr;
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          {catBenefits.map((benefit, index) => (
            <div
              key={index}
              className="p-5 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl flex gap-4 items-start group hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 flex items-center justify-center text-lg shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                {benefit.icon}
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-50 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
