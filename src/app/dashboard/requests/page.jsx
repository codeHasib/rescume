import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyRequestsPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch("http://localhost:5000/requests", {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  const requests = data;

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default:
        return "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          My Adoption Requests
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Monitor the application status and notes of your submitted pet
          adoptions.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="w-full py-12 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-center">
          <p className="text-sm font-semibold text-neutral-400 dark:text-neutral-500">
            No requests found
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            You haven&apos;t submitted any adoption forms yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="w-full p-4 sm:p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden flex-shrink-0 border border-neutral-200/50 dark:border-neutral-700/50">
                  <Image
                    src={
                      req.petImage ||
                      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=100"
                    }
                    alt={req.petName || "Pet"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-50">
                    {req.petName || "Unnamed Pet"}
                  </h3>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-0.5">
                    Id: {req.petId || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center sm:justify-end gap-3 self-end sm:self-center">
                {req.notes && (
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 max-w-[180px] truncate hidden md:inline-block">
                    &ldquo;{req.notes}&rdquo;
                  </span>
                )}
                <span
                  className={`px-3 py-1 font-bold text-xs uppercase tracking-wider border rounded-full ${getStatusStyle(req.status)}`}
                >
                  {req.status || "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
