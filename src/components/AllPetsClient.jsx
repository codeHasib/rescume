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

        const res = await fetch(
          `http://localhost:5000/pets?${params.toString()}`,
        );
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

  // const handleModalSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!pickupDate || !selectedPetForModal || !authToken) return;

  //   setIsSubmitting(true);
  //   try {
  //     const res = await fetch("http://localhost:5000/requests", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         petId: selectedPetForModal._id,
  //         petName: selectedPetForModal.petName,
  //         petImage: selectedPetForModal.image,
  //         ownerEmail: selectedPetForModal.ownerEmail,
  //         applicantName: user?.name,
  //         applicantEmail: user?.email,
  //         pickupDate,
  //         requestDate: new Date().toISOString(),
  //         message,
  //         status: "pending",
  //       }),
  //     });

  //     if (!res.ok) {
  //       const errData = await res.json();
  //       throw new Error(errData.message || "Failed to submit request");
  //     }

  //     setIsModalOpen(false);
  //     setSelectedPetForModal(null);
  //     setPickupDate("");
  //     setMessage("");
  //     router.push("/dashboard/applications");
  //   } catch (err) {
  //     alert(err.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Values Check:", {
      pickupDate,
      selectedPetForModal,
      authToken,
    });
    if (!pickupDate || !selectedPetForModal || !authToken) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/requests", {
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
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-bold mt-1">
            Browse through active records synchronized directly onto central
            cluster engines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 w-full">
          <div className="lg:col-span-3 flex flex-col gap-6 w-full">
            <div className="p-5 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                Search Profile Name ($regex)
              </label>
              <input
                type="text"
                placeholder="Type pet identity name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
              />
            </div>

            <div className="p-5 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                  Filter by Species ($in)
                </label>
                {selectedSpecies.length > 0 && (
                  <button
                    onClick={() => setSelectedSpecies([])}
                    className="text-[10px] font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors underline underline-offset-2"
                  >
                    Reset
                  </button>
                )}
              </div>

              {speciesOptions.length === 0 ? (
                <p className="text-[11px] text-neutral-400 italic">
                  No available parameters fields returned.
                </p>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {speciesOptions.map((species) => {
                    const isChecked = selectedSpecies.includes(species);
                    return (
                      <label
                        key={species}
                        className="flex items-center gap-3 group cursor-pointer select-none text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSpeciesChange(species)}
                          className="w-4 h-4 rounded-md border-neutral-300 dark:border-neutral-700 text-neutral-950 focus:ring-0 cursor-pointer accent-neutral-950 dark:accent-white"
                        />
                        <span>{species}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-9 w-full min-h-full flex flex-col">
            {loading ? (
              <div className="w-full py-24 text-center font-bold text-xs text-neutral-400 uppercase tracking-widest animate-pulse flex-1 flex items-center justify-center">
                Querying database indexes...
              </div>
            ) : pets.length === 0 ? (
              <div className="w-full py-24 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl flex flex-col items-center justify-center gap-3 flex-1">
                <span className="text-2xl select-none">🔍</span>
                <h3 className="font-black text-base text-neutral-900 dark:text-neutral-50">
                  No Companions Found
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed font-medium">
                  MongoDB query returned 0 structural logs. Try adjusting
                  criteria variables.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full items-start">
                {pets.map((pet) => {
                  const isAdopted = pet.status?.toLowerCase() === "adopted";
                  const isOwner = user && pet.ownerEmail === user.email;

                  return (
                    <div
                      key={pet._id}
                      className="group bg-white dark:bg-neutral-900/20 border border-neutral-200/70 dark:border-neutral-800/60 rounded-2xl overflow-hidden flex flex-col transition-all hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs cursor-pointer h-full"
                    >
                      <div className="w-full aspect-[4/3] bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden shrink-0">
                        <Image
                          src={
                            pet.image ||
                            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600"
                          }
                          alt={pet.petName || "Pet"}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {isAdopted && (
                          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center">
                            <span className="bg-neutral-950/80 dark:bg-white/90 text-white dark:text-neutral-950 font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md shadow-xs">
                              Adopted
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-3.5 flex flex-col flex-1 gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="font-black text-sm text-neutral-900 dark:text-neutral-50 truncate tracking-tight">
                            {pet.petName}
                          </h2>
                          <span className="text-[10px] font-bold text-emerald-500 shrink-0">
                            {!pet.adoptionFee || Number(pet.adoptionFee) === 0
                              ? "Free"
                              : `$${pet.adoptionFee}`}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide truncate">
                          {pet.breed || "Mixed Breed"} &bull;{" "}
                          {pet.species || "Animal"}
                        </p>

                        <div className="mt-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400 font-medium mb-3">
                          <span className="truncate max-w-[70%]">
                            {pet.location || "Remote"}
                          </span>
                          <span className="font-bold text-neutral-500 dark:text-neutral-400 shrink-0">
                            {pet.age || "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-center items-center gap-3 flex-col mt-auto">
                          <button
                            type="button"
                            disabled={isAdopted || isOwner}
                            onClick={(e) => handleAdoptAction(e, pet)}
                            className="p-3 text-center bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-[10px] rounded-xl tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all select-none focus:outline-none w-full"
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
                            className="p-3 text-center bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-[10px] rounded-xl tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all select-none focus:outline-none w-full"
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

      {isModalOpen && selectedPetForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-black text-lg text-neutral-900 dark:text-neutral-50 tracking-tight">
                Adopt {selectedPetForModal.petName}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Confirm your parameters to dispatch a request to the platform
                listings host.
              </p>
            </div>

            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                  Applicant Profile Email
                </label>
                <input
                  type="text"
                  readOnly
                  value={user?.email || ""}
                  className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium cursor-not-allowed focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-wide">
                  Preferred Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  min={getTargetDateMin()}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-wide">
                  Message to Owner
                </label>
                <textarea
                  rows={4}
                  placeholder="Introduce your configuration framework context to the host..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium resize-none focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors leading-relaxed"
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
                  className="w-1/2 py-2.5 text-center bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs rounded-xl tracking-wider uppercase transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 py-2.5 text-center bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-xs rounded-xl tracking-wider uppercase disabled:opacity-50 transition-opacity"
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
