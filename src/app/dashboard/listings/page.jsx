import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ListingsClient from "@/components/ListingsClient";

export default async function MyListingsPage() {
  const sessionContext = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionContext?.user) {
    redirect("/auth/signin");
  }

  const tokenContext = await auth.api.getToken({
    headers: await headers(),
  });

  let initialPets = [];
  let errorMsg = null;

  try {
    const res = await fetch("https://rescume-backend.vercel.app/pets", {
      headers: {
        Authorization: `Bearer ${tokenContext?.token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (res.ok) {
      const allPets = await res.json();
      initialPets = allPets.filter(
        (pet) => pet.ownerEmail === sessionContext.user.email,
      );
    } else {
      errorMsg = "Failed to load your listings from the server.";
    }
  } catch (err) {
    errorMsg = "An error occurred while connecting to the server.";
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          My Listings
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Manage your published pet profiles, monitor adoptions, and review
          incoming requests.
        </p>
      </div>

      <ListingsClient
        initialPets={initialPets}
        authToken={tokenContext?.token}
        errorMsg={errorMsg}
      />
    </div>
  );
}
