"use client";

export default function IntegrationRule() {
  const phases = [
    {
      title: "First 3 Days",
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/5",
      description: "Feeling overwhelmed. The animal is testing spatial limits, may refuse food logs, and often shifts baseline sleeping habits as they decompress."
    },
    {
      title: "First 3 Weeks",
      color: "border-teal-500 text-teal-500 bg-teal-500/5",
      description: "Settling into structure. The companion feels secure within the local perimeter, accepts daily routine grids, and begins to reveal their true personality parameters."
    },
    {
      title: "First 3 Months",
      color: "border-indigo-500 text-indigo-500 bg-indigo-500/5",
      description: "Complete structural integration. Building mutual trust loops, feeling entirely safe, and recognizing matching occupants as primary family nodes."
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100 dark:border-neutral-900">
      <div className="p-6 sm:p-10 bg-neutral-950 dark:bg-neutral-900 border border-neutral-900 dark:border-neutral-800 rounded-[32px] text-white flex flex-col lg:flex-row items-start justify-between gap-12 relative overflow-hidden group shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent pointer-events-none" />
        
        <div className="max-w-xs flex flex-col gap-3.5 relative z-10">
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md w-max">
            Milestone Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            The 3-3-3 <br />Acclimation Rule
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed font-medium">
            A standard structural layout tracking animal behavioral adjustment patterns across fixed timeline check-ins.
          </p>
        </div>

        <div className="flex flex-col gap-6 flex-1 max-w-xl relative z-10 w-full">
          {phases.map((phase, index) => (
            <div key={index} className="flex gap-4 border-l border-neutral-800 dark:border-neutral-700 pl-4 relative pb-2 last:pb-0">
              <div className="absolute w-2 h-2 rounded-full bg-neutral-800 dark:bg-neutral-700 -left-[5px] top-1.5" />
              <div className="flex flex-col gap-1">
                <h4 className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border w-max ${phase.color}`}>
                  {phase.title}
                </h4>
                <p className="text-xs text-neutral-300 font-medium leading-relaxed mt-1">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}