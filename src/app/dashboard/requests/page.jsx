import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RequestsDashboard from "@/components/RequestsDashboard";

export default async function MyRequestsPage() {
  const tokenContext = await auth.api.getToken({
    headers: await headers(),
  });

  const token = tokenContext?.token || "";
  let initialRequests = [];

  try {
    const res = await fetch("http://localhost:5000/requests", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      initialRequests = await res.json();
    }
  } catch (err) {
    initialRequests = [];
  }

  return (
    <RequestsDashboard initialRequests={initialRequests} authToken={token} />
  );
}
