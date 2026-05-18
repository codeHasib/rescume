import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RequestsDashboard from "@/components/RequestsDashboard";
const BASE_API_URL = "https://rescume-backend.vercel.app";

export default async function MyRequestsPage() {
  const tokenContext = await auth.api.getToken({
    headers: await headers(),
  });

  const token = tokenContext?.token || "";
  let initialRequests = [];

  try {
    const res = await fetch(`${BASE_API_URL}/requests`, {
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
