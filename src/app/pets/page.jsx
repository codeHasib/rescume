import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AllPetsClient from "@/components/AllPetsClient";

export const dynamic = "force-dynamic";

export default async function AllPetsPage() {
  let user = null;
  let token = "";

  try {
    const requestHeaders = await headers();

    const sessionContext = await auth.api
      .getSession({
        headers: requestHeaders,
      })
      .catch(() => null);

    const tokenContext = await auth.api
      .getToken({
        headers: requestHeaders,
      })
      .catch(() => null);

    user = sessionContext?.user || null;
    token = tokenContext?.token || "";
  } catch (authError) {
    console.warn(
      "User context parsed as unauthenticated guest node:",
      authError.message,
    );
  }

  let petsData = [];
  let errorMsg = null;

  try {
    const res = await fetch("https://rescume-backend.vercel.app/pets", {
      cache: "no-store",
    });
    if (res.ok) {
      petsData = await res.json();
    } else {
      errorMsg = "System failed to build current pet repository indices.";
    }
  } catch (err) {
    console.error(err);
    errorMsg = "Database connection node unreachable.";
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col gap-2 mb-10">
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          Global Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
          All Available Matches
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-md">
          Filter through active profiles across connected local nodes to
          complete structural adoptions.
        </p>
      </div>

      {errorMsg ? (
        <div className="w-full p-4 bg-rose-500/5 border border-rose-500/10 text-rose-500 text-xs font-semibold rounded-xl text-center">
          {errorMsg}
        </div>
      ) : (
        <AllPetsClient initialPets={petsData} user={user} authToken={token} />
      )}
    </div>
  );
}
