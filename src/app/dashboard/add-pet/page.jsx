import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PetForm from "@/components/PetForm";

export default async function AddPetPage() {
  const sessionContext = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionContext?.user) {
    redirect("/");
  }

  const tokenContext = await auth.api.getToken({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Create Pet Listing
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Provide detailed specifications to add a new companion animal
          available for adoption.
        </p>
      </div>

      <PetForm
        userEmail={sessionContext.user.email}
        authToken={tokenContext?.token}
      />
    </div>
  );
}
