"use client";

import { useState } from "react";
import Link from "next/link";
const BASE_API_URL = "https://rescume-backend.vercel.app";

export default function RequestsDashboard({ initialRequests, authToken }) {
  const [requests, setRequests] = useState(initialRequests);
  const [isDeletingId, setIsDeletingId] = useState(null);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    }
  };

  const handleCancelRequest = async (requestId) => {
    if (
      !window.confirm("Are you sure you want to cancel this adoption request?")
    )
      return;

    setIsDeletingId(requestId);
    try {
      const res = await fetch(`${BASE_API_URL}/requests/${requestId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to cancel request.");

      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div>
        <h2 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
          My Requests
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
          Track and manage adoption applications you have submitted.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="w-full py-12 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl text-center">
          <p className="text-sm font-bold text-neutral-400 dark:text-neutral-500">
            No requests submitted yet.
          </p>
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  <th className="p-4">Pet Name</th>
                  <th className="p-4">Request Date</th>
                  <th className="p-4">Pickup Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs font-medium">
                {requests.map((req) => {
                  const targetPetId =
                    typeof req.petId === "object" ? req.petId?._id : req.petId;
                  const formattedRequestDate = req.requestDate
                    ? new Date(req.requestDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A";

                  return (
                    <tr
                      key={req._id}
                      className="hover:bg-neutral-50/40 dark:hover:bg-neutral-950/10 transition-colors"
                    >
                      <td className="p-4 font-black text-neutral-900 dark:text-neutral-100">
                        {req.petName}
                      </td>
                      <td className="p-4 text-neutral-500 dark:text-neutral-400">
                        {formattedRequestDate}
                      </td>
                      <td className="p-4 text-neutral-700 dark:text-neutral-300 font-bold">
                        {req.pickupDate}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 font-black text-[9px] uppercase tracking-wider border rounded-full ${getStatusStyle(req.status)}`}
                        >
                          {req.status || "pending"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/pets/${targetPetId}`}
                            className="px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-850 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 font-black text-[10px] rounded-lg tracking-wider uppercase transition-colors"
                          >
                            View
                          </Link>
                          <button
                            disabled={isDeletingId === req._id}
                            onClick={() => handleCancelRequest(req._id)}
                            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white border border-rose-500/20 dark:border-rose-500/30 font-black text-[10px] rounded-lg tracking-wider uppercase transition-colors disabled:opacity-40"
                          >
                            {isDeletingId === req._id
                              ? "Canceling..."
                              : "Cancel"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
