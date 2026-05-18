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

  const token = tokenContext?.token || "";
  let initialPets = [];
  let allIncomingRequests = [];
  let errorMsg = null;

  try {
    const [petsRes, requestsRes] = await Promise.all([
      fetch("https://rescume-backend.vercel.app/pets", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      }),
      fetch("http://localhost:5000/incoming-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      }),
    ]);

    if (petsRes.ok) {
      const allPets = await petsRes.json();
      initialPets = allPets.filter(
        (pet) => pet.ownerEmail === sessionContext.user.email,
      );
    } else {
      errorMsg = "Failed to load your listings from the server.";
    }

    if (requestsRes.ok) {
      allIncomingRequests = await requestsRes.json();
    }
  } catch (err) {
    errorMsg = "An error occurred while connecting to the server.";
  }

  return (
    <ListingsClient
      initialPets={initialPets}
      allIncomingRequests={allIncomingRequests}
      authToken={token}
      errorMsg={errorMsg}
    />
  );
}
