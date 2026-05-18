"use client";

import Link from "next/link";

export default function CommunityCo() {
  const networks = [
    {
      title: "Emergency Channels",
      desc: "24/7 priority routing to connected regional medical networks directly through your application grid profile."
    },
    {
      title: "Behavioral Syncing",
      desc: "Access direct scheduling lines with certified animal behavioral specialists to clear up post-adoption anomalies."
    },
    {
      title: "Supply Chain Perks",
      desc: "Unlock localized resource discounts for premium feed structures and basic maintenance kits allocated to active owners."
    },
    {
      title: "Fostering Transits",
      desc: "Seamlessly switch permissions to open your residential space as a temporary station node for incoming matches."
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100 dark:border-neutral-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {networks.map((item, index) => (
            <div 
              key={index} 
              className="p-5 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl flex flex-col gap-2 bg-white dark:bg-neutral-950 transition-colors duration-300 hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              <h4 className="font-black text-xs text-neutral-900 dark:text-neutral-50 uppercase tracking-wider">
                {item.title}
              </h4>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-4">
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            Extended Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            The Co-Op Network Support System
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
            Adoption isn’t just a simple database status change. Our platform links you directly with post-placement community infrastructures, keeping you backed by secure care channels long after the initial pickup date is settled.
          </p>
          <div className="pt-2">
            <Link 
              href="/network-directory" 
              className="text-xs font-bold text-neutral-900 dark:text-neutral-50 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
            >
              Explore Node Map &rarr;
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}