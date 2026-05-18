"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function OwnerPetView({ pet, initialRequests, authToken }) {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [actionLoading, setActionLoading] = useState(null);

  const handleUpdateStatus = async (requestId, newStatus) => {
    setActionLoading(requestId);
    try {
      const res = await fetch(
        `https://rescume-backend.vercel.app/requests/${requestId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!res.ok) throw new Error("Failed to update request status.");

      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: newStatus } : req,
        ),
      );
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div>
            <Link
              href="/dashboard/listings"
              className="text-xs font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 flex items-center gap-1 mb-1 transition-colors"
            >
              &larr; Back to Listings
            </Link>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
              {pet.petName}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {pet.breed} &bull; {pet.location}
            </p>
          </div>
          <Link
            href={`/dashboard/listings/edit/${pet._id}`}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs rounded-xl transition-colors tracking-wide uppercase"
          >
            Edit Details
          </Link>
        </div>

        <div className="w-full aspect-[4/3] rounded-2xl bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60">
          <Image
            src={
              pet.image ||
              "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600"
            }
            alt={pet.petName}
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-neutral-50 dark:bg-neutral-900/40 p-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Age
            </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {pet.age}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Gender
            </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              {pet.gender}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Vaccination
            </span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate">
              {pet.vaccinationStatus}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Fee
            </span>
            <span className="font-bold text-emerald-500">
              {Number(pet.adoptionFee) === 0 ? "Free" : `$${pet.adoptionFee}`}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 uppercase tracking-wider">
            Public Profile Description
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium whitespace-pre-line">
            {pet.description}
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-5 sticky top-6">
        <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm flex flex-col gap-4 max-h-[85vh]">
          <div>
            <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-50">
              Adoption Requests
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Review profiles and coordinate status paths for candidates.
            </p>
          </div>

          <div className="overflow-y-auto flex flex-col gap-3 pr-1">
            {requests.length === 0 ? (
              <p className="text-xs text-neutral-400 dark:text-neutral-500 py-8 text-center font-medium">
                No application submissions received for this pet yet.
              </p>
            ) : (
              requests.map((req) => (
                <div
                  key={req._id}
                  className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="truncate">
                      <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 truncate">
                        {req.applicantName || "Anonymous Card"}
                      </p>
                      <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">
                        {req.applicantEmail}
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 border rounded-md shrink-0 ${
                        req.status === "approved"
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
                          : req.status === "rejected"
                            ? "bg-rose-500/5 border-rose-500/20 text-rose-500"
                            : "bg-amber-500/5 border-amber-500/20 text-amber-500"
                      }`}
                    >
                      {req.status || "pending"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-xs text-neutral-600 dark:text-neutral-400 border-t border-neutral-200/50 dark:border-neutral-800/60 pt-2">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wide">
                      Pickup Date Plan:
                    </p>
                    <p className="font-semibold text-neutral-700 dark:text-neutral-300">
                      {req.pickupDate
                        ? new Date(req.pickupDate).toLocaleDateString()
                        : "Not Specified"}
                    </p>
                  </div>

                  {req.notes && (
                    <div className="p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-lg text-xs italic text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                      &ldquo;{req.notes}&rdquo;
                    </div>
                  )}

                  {req.status === "pending" && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        disabled={actionLoading !== null}
                        onClick={() => handleUpdateStatus(req._id, "rejected")}
                        className="py-1.5 text-xs font-bold text-center border border-neutral-200 dark:border-neutral-800 hover:bg-rose-500 hover:text-white hover:border-rose-500 text-neutral-600 dark:text-neutral-400 rounded-lg transition-all"
                      >
                        Reject
                      </button>
                      <button
                        disabled={actionLoading !== null}
                        onClick={() => handleUpdateStatus(req._id, "approved")}
                        className="py-1.5 text-xs font-bold text-center bg-emerald-500 text-white hover:opacity-90 rounded-lg transition-opacity"
                      >
                        {actionLoading === req._id ? "..." : "Approve"}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
