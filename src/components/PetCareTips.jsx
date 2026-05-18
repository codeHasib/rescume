"use client";

export default function PetCareTips() {
  const tips = [
    {
      id: "01",
      title: "Micro-Environment Setting",
      description: "Keep transitions smooth. Designate a quiet area with clear boundaries during the initial 72 hours inside your residential space.",
      icon: "🏠"
    },
    {
      id: "02",
      title: "Dietary Path Calibration",
      description: "Abrupt feeding adjustments can startle digestion. Keep the source profile diet consistent before updating nutritional tiers.",
      icon: "🥣"
    },
    {
      id: "03",
      title: "Structured Exercise Loops",
      description: "Dogs benefit from predictable outdoor walking routes, while cats require dedicated vertical spaces and scratching poles.",
      icon: "🐕"
    },
    {
      id: "04",
      title: "Medical Record Continuity",
      description: "Schedule an initial validation check-up with a local veterinary clinic to transition ownership profiles smoothly within health grids.",
      icon: "🩺"
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100 dark:border-neutral-900">
      <div className="flex flex-col gap-2 mb-12">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          Operational Advice
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
          Essential Integration Tips
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-md">
          Maintain functional structural guidelines to guarantee a reliable acclimation cycle for incoming companions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip) => (
          <div 
            key={tip.id}
            className="group p-6 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl flex flex-col gap-5 hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl select-none bg-neutral-100 dark:bg-neutral-950 p-2.5 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 group-hover:bg-emerald-500/5 group-hover:border-emerald-500/10 transition-colors">
                {tip.icon}
              </span>
              <span className="text-xl font-black text-neutral-300 dark:text-neutral-800 font-mono tracking-tight group-hover:text-emerald-500/20 transition-colors duration-300">
                {tip.id}
              </span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-50 tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {tip.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}