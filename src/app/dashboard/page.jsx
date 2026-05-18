import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardWelcomeClient from "@/components/DashboardWelcome";

export default async function DashboardPage() {
  const sessionContext = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionContext?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <DashboardWelcomeClient user={sessionContext.user} />
    </div>
  );
}
