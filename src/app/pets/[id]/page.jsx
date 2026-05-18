import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PetDetails from "@/components/PetDetails";

export default async function PetAdoptionPage({ params }) {
  const { id } = await params;

  const sessionContext = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionContext?.user) {
    redirect(`/auth/signin?callbackUrl=/pets/${id}/adopt`);
  }

  const tokenContext = await auth.api.getToken({
    headers: await headers(),
  });

  let petData = null;

  try {
    const res = await fetch(`http://localhost:5000/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenContext?.token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    if (res.ok) {
      petData = await res.json();
    }
  } catch (err) {
    console.error("Failed fetching pet details:", err);
  }

  if (!petData) {
    return (
      <div className="w-full max-w-xl mx-auto mt-12 p-4 bg-rose-500/5 border border-rose-500/10 text-rose-500 text-xs font-semibold rounded-xl text-center">
        The requested pet profile is currently unavailable or does not exist.
      </div>
    );
  }

  const isOwner = sessionContext.user.email === petData.ownerEmail;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <PetDetails
        pet={petData}
        user={sessionContext.user}
        authToken={tokenContext?.token}
        isOwner={isOwner}
      />
    </div>
  );
}
