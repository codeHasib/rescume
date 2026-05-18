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
    <section id="gallery-anchor" className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100 dark:border-neutral-900 scroll-mt-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            Live Database
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 mt-1">
            Featured Companions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-md font-medium">
            Browse through active listings matching local node registration requirements.
          </p>
        </div>
      </div>

      {errorMsg ? (
        <div className="w-full p-4 bg-rose-500/5 border border-rose-500/10 text-rose-500 text-xs font-semibold rounded-xl text-center">
          {errorMsg}
        </div>
      ) : (
        <FeaturedPetsGrid initialPets={featuredListings} />
      )}
    </section>
  );
}