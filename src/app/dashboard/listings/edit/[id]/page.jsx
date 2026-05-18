import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import EditPetForm from "@/components/EditPetForm";
const BASE_API_URL = "https://rescume-backend.vercel.app";
export const dynamic = "force-dynamic";

export default async function EditPetPage({ params }) {
  const { id } = await params;

  const sessionContext = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionContext?.user) {
    redirect("/auth/signin");
  }

  const tokenContext = await auth.api.getToken({
    headers: await headers(),
  });

  let petData = null;

  try {
    const res = await fetch(`${BASE_API_URL}/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenContext?.token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (res.ok) {
      petData = await res.json();
    }
  } catch (err) {
    console.error(err);
  }

  if (!petData) {
    return (
      <div className="w-full p-4 bg-rose-500/5 border border-rose-500/10 text-rose-500 text-sm font-semibold rounded-xl">
        Pet profile not found or unavailable.
      </div>
    );
  }

  if (petData.ownerEmail !== sessionContext.user.email) {
    redirect("/dashboard/listings");
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Update Pet Profile
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Modify the specifications and details for {petData.petName}.
        </p>
      </div>

      <EditPetForm pet={petData} authToken={tokenContext?.token} />
    </div>
  );
}
