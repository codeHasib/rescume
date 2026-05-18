"use client";

export default function CreativeStaticSections() {
  const careTips = [
    {
      number: "01",
      title: "Micro-Environment Setting",
      desc: "Keep transitions smooth. Designate a quiet area with clear boundaries during the initial 72 hours inside your residential space.",
    },
    {
      number: "02",
      title: "Dietary Path Calibration",
      desc: "Abrupt feeding adjustments can startle digestion. Keep the source profile diet consistent before updating nutritional tiers.",
    },
    {
      number: "03",
      title: "Structured Exercise Loops",
      desc: "Dogs benefit from predictable outdoor walking routes, while cats require dedicated vertical spaces and scratching poles.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-24 pb-24 max-w-6xl mx-auto px-4">
      <section className="flex flex-col gap-10 border-t border-neutral-100 dark:border-neutral-900 pt-16 sm:pt-24">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            Operational Advice
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
            Essential Integration Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careTips.map((tip, index) => (
            <div
              key={index}
              className="p-6 bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/60 rounded-3xl flex flex-col gap-4 group hover:bg-white dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-xs"
            >
              <span className="text-2xl font-black text-emerald-500/20 dark:text-emerald-400/10 font-mono tracking-tight group-hover:text-emerald-500 transition-colors duration-300">
                {tip.number}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-50 tracking-tight">
                  {tip.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-6 sm:p-10 bg-neutral-950 dark:bg-neutral-900 border border-neutral-900 dark:border-neutral-800 rounded-[32px] text-white flex flex-col md:flex-row items-start justify-between gap-10 relative overflow-hidden group shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent pointer-events-none" />

        <div className="max-w-xs flex flex-col gap-3 relative z-10">
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md w-max">
            Milestone Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            The 3-3-3 <br />
            Acclimation Rule
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed font-medium">
            A standard structural layout tracking animal behavioral patterns
            across fixed timeline check-ins.
          </p>
        </div>

        <div className="flex flex-col gap-6 flex-1 max-w-xl relative z-10">
          <div className="flex gap-4 border-l border-neutral-800 pl-4 relative">
            <div className="absolute w-2 h-2 rounded-full bg-emerald-400 -left-[5px] top-1.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                First 3 Days
              </h4>
              <p className="text-xs text-neutral-300 mt-1 font-medium leading-relaxed">
                Feeling overwhelmed. Animal testing spatial limits, may refuse
                food logs, and shifts baseline sleeping habits.
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-l border-neutral-800 pl-4 relative">
            <div className="absolute w-2 h-2 rounded-full bg-teal-400 -left-[5px] top-1.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                First 3 Weeks
              </h4>
              <p className="text-xs text-neutral-300 mt-1 font-medium leading-relaxed">
                Settling into structure. Feels secure within the local
                perimeter, accepts daily routine grids, and reveals distinct
                personality parameters.
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-l border-neutral-800 pl-4 relative">
            <div className="absolute w-2 h-2 rounded-full bg-indigo-400 -left-[5px] top-1.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                First 3 Months
              </h4>
              <p className="text-xs text-neutral-300 mt-1 font-medium leading-relaxed">
                Complete structural integration. Building mutual trust loops,
                feeling safe, and recognizing matching occupants as primary
                family nodes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-2 gap-4">
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col gap-1.5 bg-white dark:bg-neutral-950">
            <h4 className="font-bold text-xs text-neutral-900 dark:text-neutral-50 uppercase tracking-wide">
              Emergency Channels
            </h4>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium leading-relaxed">
              24/7 priority routing to connected regional medical networks
              directly through your application grid profile.
            </p>
          </div>
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col gap-1.5 bg-white dark:bg-neutral-950">
            <h4 className="font-bold text-xs text-neutral-900 dark:text-neutral-50 uppercase tracking-wide">
              Behavioral Syncing
            </h4>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium leading-relaxed">
              Access direct scheduling lines with certified animal behavioral
              specialists to clear up post-adoption anomalies.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-4">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
            Extended Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            The Co-Op Network Support System
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
            Adoption isn’t just a simple database status change. Our platform
            links you directly with post-placement community infrastructures,
            keeping you backed by care channels long after the initial pickup
            date.
          </p>
        </div>
      </section>
    </div>
  );
}
