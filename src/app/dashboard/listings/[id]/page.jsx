import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import OwnerPetView from "@/components/OwnerPetView";

export default async function OwnerPetViewPage({ params }) {
  const { id } = await params;
  console.log(id);

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
  let requestsData = [];

  try {
    const petRes = await fetch(`http://localhost:5000/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenContext?.token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (petRes.ok) {
      petData = await petRes.json();
    }

    if (petData && petData.ownerEmail === sessionContext.user.email) {
      const reqRes = await fetch("http://localhost:5000/requests", {
        headers: {
          Authorization: `Bearer ${tokenContext?.token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      });

      if (reqRes.ok) {
        const allRequests = await reqRes.json();
        requestsData = allRequests.filter((req) => req.petId === id);
      }
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
    <div className="flex flex-col gap-6 w-full">
      <OwnerPetView
        pet={petData}
        initialRequests={requestsData}
        authToken={tokenContext?.token}
      />
    </div>
  );
}
