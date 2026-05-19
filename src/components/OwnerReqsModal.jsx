"use client";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const BASE_API_URL = "https://rescume-backend.vercel.app";
export default function OwnerReqsModal({
  isOpen,
  onClose,
  requests = [],
  pet,
  authToken,
  onStatusUpdate,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  if (!isOpen || !pet) return null;

  const activePetRequests = requests.filter((req) => {
    const targetPetId =
      typeof req.petId === "object" ? req.petId?._id : req.petId;
    return targetPetId === pet._id;
  });

  const handleUpdateStatus = async (requestId, nextStatus) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`${BASE_API_URL}/requests/${requestId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: nextStatus,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update status.");
      }

      const updatedRequest = await res.json();

      if (onStatusUpdate) {
        onStatusUpdate(updatedRequest);
      }

      if (typeof setIsModalOpen === "function") {
        setIsModalOpen(false);
      } else if (typeof setOpen === "function") {
        setOpen(false);
      }
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
              Adoption Requests
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
              Review applications submitted for <strong>{pet.petName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-bold text-sm transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex flex-col gap-4">
          {activePetRequests.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center gap-2">
              <span className="text-2xl">📥</span>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                No Requests Found
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {activePetRequests.map((req) => {
                const currentStatus = req.status?.toLowerCase() || "pending";
                const isDecisionMade =
                  currentStatus === "approved" || currentStatus === "rejected";

                return (
                  <div
                    key={req._id}
                    className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1.5 max-w-md">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm text-neutral-800 dark:text-neutral-200">
                          {req.applicantName || "Anonymous Adopter"}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 font-bold tracking-wider rounded-md bg-neutral-200/60 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 truncate max-w-[180px]">
                          {req.applicantEmail}
                        </span>
                      </div>

                      <div className="flex flex-col gap-0.5 text-xs">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                          Target Pickup Date
                        </span>
                        <span className="font-bold text-neutral-700 dark:text-neutral-300">
                          {req.pickupDate}
                        </span>
                      </div>

                      {req.message && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 p-2.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 italic leading-relaxed font-medium mt-1">
                          &ldquo;{req.message}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-end gap-2 shrink-0 justify-end">
                      {isDecisionMade ? (
                        <span
                          className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-full select-none ${
                            currentStatus === "approved"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                          }`}
                        >
                          {currentStatus}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            disabled={isProcessing}
                            onClick={() =>
                              handleUpdateStatus(req._id, "Approved")
                            }
                            className="px-3 py-2 text-center bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] rounded-xl tracking-wider uppercase transition-colors disabled:opacity-40"
                          >
                            Approve
                          </button>
                          <button
                            disabled={isProcessing}
                            onClick={() =>
                              handleUpdateStatus(req._id, "Rejected")
                            }
                            className="px-3 py-2 text-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-rose-600 dark:text-rose-400 border border-neutral-200 dark:border-neutral-700 font-black text-[10px] rounded-xl tracking-wider uppercase transition-colors disabled:opacity-40"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
