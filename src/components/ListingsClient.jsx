"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DeleteModal } from "./DeleteModal";

export default function ListingsClient({ initialPets, authToken, errorMsg }) {
  const router = useRouter();
  const [pets, setPets] = useState(initialPets);
  const [actionLoading, setActionLoading] = useState(null);
  const [activeRequests, setActiveRequests] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalListings = pets.length;
  const adoptedCount = pets.filter(
    (p) => p.status?.toLowerCase() === "adopted",
  ).length;
  const availableCount = totalListings - adoptedCount;

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/pets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to delete listing.");

      setPets((prev) => prev.filter((pet) => pet._id !== id));
      router.refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleOpenRequests = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch("http://localhost:5000/requests", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Could not fetch request data.");

      const allRequests = await res.json();
      const filtered = allRequests.filter((req) => req.petId === id);

      setActiveRequests(filtered);
      setIsModalOpen(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (errorMsg) {
    return (
      <div className="w-full p-4 bg-rose-500/5 border border-rose-500/10 text-rose-500 text-sm font-semibold rounded-xl">
        {errorMsg}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Overview Statistics Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Total
          </p>
          <p className="text-xl sm:text-2xl font-black mt-1 text-neutral-900 dark:text-neutral-50">
            {totalListings}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Available
          </p>
          <p className="text-xl sm:text-2xl font-black mt-1 text-emerald-500">
            {availableCount}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Adopted
          </p>
          <p className="text-xl sm:text-2xl font-black mt-1 text-blue-500">
            {adoptedCount}
          </p>
        </div>
      </div>

      {/* Grid Layout Cards */}
      {pets.length === 0 ? (
        <div className="w-full py-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-center">
          <p className="text-sm font-semibold text-neutral-400 dark:text-neutral-500">
            No active listings
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            Pets you put up for adoption will exhibit here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="p-4 flex flex-col gap-3">
                <div className="w-full aspect-[4/3] rounded-xl bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50">
                  <Image
                    src={
                      pet.image ||
                      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400"
                    }
                    alt={pet.petName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-50 truncate">
                    {pet.petName}
                  </h3>
                  <span className="text-sm font-black text-emerald-500 flex-shrink-0">
                    {Number(pet.adoptionFee) === 0
                      ? "Free"
                      : `$${pet.adoptionFee}`}
                  </span>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-neutral-100 dark:border-neutral-800/60 grid grid-cols-2 gap-2">
                <button
                  disabled={actionLoading !== null}
                  onClick={() => handleOpenRequests(pet._id)}
                  className="col-span-2 py-2 text-xs font-bold text-center bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-500/10 hover:text-emerald-500 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 text-neutral-700 dark:text-neutral-300 rounded-xl transition-colors"
                >
                  {actionLoading === pet._id
                    ? "Processing..."
                    : "View Requests"}
                </button>

                <Link
                  href={`/dashboard/listings/${pet._id}`}
                  className="py-2 text-xs font-bold text-center border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                >
                  View Profile
                </Link>

                <Link
                  href={`/dashboard/listings/edit/${pet._id}`}
                  className="py-2 text-xs font-bold text-center border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                >
                  Edit Details
                </Link>

                {/* <button
                  disabled={actionLoading !== null}
                  onClick={() => handleDelete(pet._id)}
                  className="col-span-2 py-2 text-xs font-bold text-center bg-rose-500/5 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl border border-rose-500/10 transition-colors"
                >
                  Remove Listing
                </button> */}
                <div className="col-span-full flex justify-center items-center">
                  <DeleteModal
                    petId={pet._id}
                    petName={pet.petName}
                    handleDelete={handleDelete}
                  ></DeleteModal>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Requests Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl flex flex-col max-h-[80vh]">
            <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-50">
                Incoming Applications
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setActiveRequests(null);
                }}
                className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-lg font-bold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                &times;
              </button>
            </div>
            <div className="p-5 overflow-y-auto flex flex-col gap-3">
              {activeRequests?.length === 0 ? (
                <p className="text-sm text-neutral-400 dark:text-neutral-500 py-4 text-center">
                  No current user applications submitted for this pet.
                </p>
              ) : (
                activeRequests?.map((req) => (
                  <div
                    key={req._id}
                    className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 truncate">
                        {req.applicantEmail}
                      </p>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-md text-neutral-600 dark:text-neutral-400">
                        {req.status || "Pending"}
                      </span>
                    </div>
                    {req.notes && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 italic font-medium leading-relaxed">
                        &ldquo;{req.notes}&rdquo;
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
