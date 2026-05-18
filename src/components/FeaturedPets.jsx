import FeaturedPetsGrid from "./FeaturedPetsGrid";

export default async function FeaturedPets() {
  let pets = [];
  let errorMsg = null;

  try {
    const res = await fetch("https://rescume-backend.vercel.app/pets", {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      pets = await res.json();
    } else {
      errorMsg = "Failed to fetch current animal indices.";
    }
  } catch (err) {
    console.error(err);
    errorMsg = "Network connection fault encountered.";
  }

  const featuredListings = pets.slice(0, 6);

  return (
    <section
      id="gallery-anchor"
      className="w-full max-w-6xl mx-auto px-4 py-20 sm:py-28 border-t border-neutral-200/60 dark:border-neutral-900/50 scroll-mt-6"
    >
      <div className="flex flex-col gap-2 mb-12 max-w-xl">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Live Companions
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
          Featured Companions
        </h2>

        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-semibold tracking-wide leading-relaxed">
          Get your best companions
        </p>
      </div>

      {errorMsg ? (
        <div className="w-full p-6 bg-red-500/5 border border-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-2xl text-center tracking-wide">
          {errorMsg}
        </div>
      ) : (
        <FeaturedPetsGrid initialPets={featuredListings} />
      )}
    </section>
  );
}
