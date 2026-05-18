export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        {/* Modern Minimal Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-neutral-100 dark:border-neutral-900" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-500 animate-spin" />
        </div>

        {/* Branding Elements */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-sm font-black tracking-widest uppercase text-neutral-800 dark:text-neutral-200">
            Rescume
          </h2>
          <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mt-1">
            Loading System Modules...
          </p>
        </div>
      </div>
    </div>
  );
}
