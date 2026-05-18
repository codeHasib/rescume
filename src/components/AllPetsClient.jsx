"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AllPetsClient({
  initialPets = [],
  user = null,
  authToken = "",
}) {
  const router = useRouter();
  const [pets, setPets] = useState(initialPets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetForModal, setSelectedPetForModal] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_API_URL = "https://rescume-backend.vercel.app";

  const speciesOptions = useMemo(() => {
    const speciesSet = new Set(
      initialPets.map((pet) => pet.species).filter(Boolean),
    );
    return Array.from(speciesSet);
  }, [initialPets]);

  useEffect(() => {
    const fetchFilteredPets = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("name", searchQuery);
        if (selectedSpecies.length > 0)
          params.append("species", selectedSpecies.join(","));

        const res = await fetch(`${BASE_API_URL}/pets?${params.toString()}`);
        if (!res.ok) throw new Error("Database interface mapping failure");
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Filter evaluation execution block failure:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFilteredPets();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedSpecies, initialPets]);

  const handleSpeciesChange = (species) => {
    setSelectedSpecies((prev) =>
      prev.includes(species)
        ? prev.filter((item) => item !== species)
        : [...prev, species],
    );
  };

  const handleAdoptAction = (e, pet) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/auth/signin");
      return;
    }

    setSelectedPetForModal(pet);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!pickupDate || !selectedPetForModal || !authToken) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${BASE_API_URL}/requests`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: selectedPetForModal._id,
          petName: selectedPetForModal.petName,
          petImage: selectedPetForModal.image,
          ownerEmail: selectedPetForModal.ownerEmail,
          applicantName: user?.name,
          applicantEmail: user?.email,
          pickupDate,
          requestDate: new Date().toISOString(),
          message,
          status: "pending",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (
          res.status === 401 ||
          data.message?.includes("exp") ||
          data.error?.includes("exp")
        ) {
          alert("Your session has expired. Please sign in again.");
          setIsModalOpen(false);
          router.push("/auth/signin");
          return;
        }
        throw new Error(data.message || "Failed to submit request");
      }

      setIsModalOpen(false);
      setSelectedPetForModal(null);
      setPickupDate("");
      setMessage("");
      router.push("/dashboard/requests");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDetails = (petId) => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    router.push(`/pets/${petId}`);
  };

  const getTargetDateMin = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col">
        <div className="mb-10 shrink-0">
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Find Your Companion
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-semibold mt-1 tracking-wide">
            Browse through verified animal records currently live on production
            pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 w-full">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-6 w-full">
            <div className="p-5 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-900 rounded-3xl flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Search Name
              </label>
              <input
                type="text"
                placeholder="Type pet identity name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl font-semibold tracking-wide focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700 transition-colors duration-200"
              />
            </div>

            <div className="p-5 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-900 rounded-3xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Filter by Species
                </label>
                {selectedSpecies.length > 0 && (
                  <button
                    onClick={() => setSelectedSpecies([])}
                    className="text-[10px] font-black text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 underline underline-offset-4 uppercase tracking-wider"
                  >
                    Reset
                  </button>
                )}
              </div>

              {speciesOptions.length === 0 ? (
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-semibold italic tracking-wide">
                  No available system parameters returned.
                </p>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {speciesOptions.map((species) => {
                    const isChecked = selectedSpecies.includes(species);
                    return (
                      <label
                        key={species}
                        className="flex items-center gap-3 group cursor-pointer select-none text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSpeciesChange(species)}
                          className="w-4 h-4 rounded-md border-neutral-300 dark:border-neutral-700 text-emerald-500 focus:ring-0 cursor-pointer accent-neutral-950 dark:accent-white"
                        />
                        <span className="tracking-wide">{species}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Grid Area */}
          <div className="lg:col-span-9 w-full min-h-full flex flex-col">
            {loading ? (
              <div className="w-full py-24 text-center font-black text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest animate-pulse flex-1 flex items-center justify-center">
                Synchronizing remote cluster lists...
              </div>
            ) : pets.length === 0 ? (
              <div className="w-full py-24 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl flex flex-col items-center justify-center gap-2 flex-1">
                <span className="text-xl select-none mb-1">📋</span>
                <h3 className="font-black text-sm uppercase tracking-wider text-neutral-900 dark:text-neutral-50">
                  No Companions Found
                </h3>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-xs mx-auto leading-relaxed font-semibold tracking-wide">
                  Production endpoint returned empty structural logs. Try
                  adjusting filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full items-start">
                {pets.map((pet) => {
                  const isAdopted = pet.status?.toLowerCase() === "adopted";
                  const isOwner = user && pet.ownerEmail === user.email;

                  return (
                    <div
                      key={pet._id}
                      className="group bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-900 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-800 h-full"
                    >
                      {/* Image Frame */}
                      <div className="w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden shrink-0 border-b border-neutral-200/50 dark:border-neutral-900">
                        <Image
                          src={
                            pet.image ||
                            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600"
                          }
                          alt={pet.petName || "Pet"}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        {isAdopted && (
                          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center">
                            <span className="bg-neutral-950/80 dark:bg-white/90 text-white dark:text-neutral-950 font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md">
                              Adopted
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-4 flex flex-col flex-1 gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="font-black text-sm text-neutral-950 dark:text-neutral-50 truncate tracking-tight">
                            {pet.petName}
                          </h2>
                          <span className="text-[11px] font-black text-emerald-500 tracking-wide shrink-0">
                            {!pet.adoptionFee || Number(pet.adoptionFee) === 0
                              ? "FREE"
                              : `$${pet.adoptionFee}`}
                          </span>
                        </div>

                        <p className="text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest truncate">
                          {pet.breed || "Mixed"} &bull;{" "}
                          {pet.species || "Animal"}
                        </p>

                        <div className="mt-2 pt-2 border-t border-neutral-200/40 dark:border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold tracking-wide">
                          <span className="truncate max-w-[70%]">
                            {pet.location || "Remote"}
                          </span>
                          <span className="shrink-0 font-bold uppercase text-[9px] tracking-wider px-1.5 py-0.5 rounded-md bg-neutral-200/50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400">
                            {pet.age || "N/A"}
                          </span>
                        </div>

                        {/* Dual Actions Stack */}
                        <div className="grid grid-cols-1 gap-2 mt-4 pt-1">
                          <button
                            type="button"
                            disabled={isAdopted || isOwner}
                            onClick={(e) => handleAdoptAction(e, pet)}
                            className="w-full py-2.5 text-center bg-emerald-500 dark:bg-emerald-600 text-white font-black text-[10px] rounded-xl tracking-widest uppercase disabled:opacity-30 disabled:hover:bg-emerald-500 dark:disabled:hover:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors duration-200 select-none focus:outline-none"
                          >
                            {isAdopted
                              ? "Adopted"
                              : isOwner
                                ? "Your Listing"
                                : "Adopt Now"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleViewDetails(pet._id)}
                            className="w-full py-2.5 text-center bg-transparent border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-black text-[10px] rounded-xl tracking-widest uppercase hover:bg-neutral-100 dark:hover:bg-neutral-900/60 hover:text-neutral-950 dark:hover:text-white transition-all duration-200 select-none focus:outline-none"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && selectedPetForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
          <div
            className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-black text-base uppercase tracking-wider text-neutral-950 dark:text-neutral-50">
                Adopt {selectedPetForModal.petName}
              </h3>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold tracking-wide mt-1">
                Confirm your configuration credentials to dispatch your
                structural adoption file.
              </p>
            </div>

            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Applicant Profile Email
                </label>
                <input
                  type="text"
                  readOnly
                  value={user?.email || ""}
                  className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-neutral-900/40 text-neutral-400 dark:text-neutral-500 border border-neutral-200/60 dark:border-neutral-900 rounded-xl font-semibold tracking-wide cursor-not-allowed focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                  Preferred Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  min={getTargetDateMin()}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl font-semibold tracking-wide focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700 transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                  Message to Owner
                </label>
                <textarea
                  rows={4}
                  placeholder="Introduce your home environment variables to the host..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl font-semibold tracking-wide resize-none focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700 transition-colors duration-200 leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedPetForModal(null);
                  }}
                  className="w-1/2 py-2.5 text-center bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-black text-[10px] tracking-widest uppercase rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 py-2.5 text-center bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-[10px] tracking-widest uppercase rounded-xl disabled:opacity-40 transition-opacity duration-200"
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
