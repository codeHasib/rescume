import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PetDetails from "@/components/PetDetails";

const BASE_API_URL = "https://rescume-backend.vercel.app";
export const dynamic = "force-dynamic";

export default async function PetAdoptionPage({ params }) {
  const { id } = await params;
  const requestHeaders = await headers();
  const sessionContext = await auth.api
    .getSession({ headers: requestHeaders })
    .catch(() => null);
  if (!sessionContext?.user) {
    redirect(`/auth/signin?callbackUrl=/pets/${id}`);
  }

  const tokenContext = await auth.api
    .getToken({ headers: requestHeaders })
    .catch(() => null);

  let petData = null;
  try {
    const res = await fetch(`${BASE_API_URL}/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenContext?.token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, 
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      petData = await res.json();
    }
  } catch (err) {
    console.error("Pet fetch failed:", err.message);
  }

  if (!petData) {
    return (
      <div className="w-full max-w-xl mx-auto mt-12 p-6 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-center">
        <p className="font-bold">Backend Connection Timeout</p>
        <p className="text-sm">
          The server took too long to respond. Please refresh the page.
        </p>
      </div>
    );
  }

  const isOwner = sessionContext.user.email === petData.ownerEmail;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <PetDetails
        pet={petData}
        user={sessionContext.user}
        authToken={tokenContext?.token}
        isOwner={isOwner}
      />
    </div>
  );
}
