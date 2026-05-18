"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PetDetails({ pet, user, authToken }) {
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successState, setSuccessState] = useState(false);

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!pickupDate) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/requests", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: pet._id,
          petName: pet.petName,
          applicantName: user.name,
          applicantEmail: user.email,
          pickupDate,
          notes,
          status: "pending",
        }),
      });

      if (!res.ok)
        throw new Error("Could not log application submission data.");

      setSuccessState(true);
      setTimeout(() => {
        router.push("/dashboard/applications");
      }, 2000);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full animate-fade-in">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div>
          <Link
            href="/pets"
            className="text-xs font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 flex items-center gap-1 mb-2 transition-colors"
          >
            &larr; Back to Directory
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
            {pet.petName}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-bold">
            {pet.breed} &bull; {pet.location}
          </p>
        </div>

        <div className="w-full aspect-[4/3] rounded-3xl bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs">
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
            <span className="font-black text-neutral-800 dark:text-neutral-200 text-sm">
              {pet.age}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Gender
            </span>
            <span className="font-black text-neutral-800 dark:text-neutral-200 text-sm">
              {pet.gender}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Vaccination
            </span>
            <span className="font-black text-neutral-800 dark:text-neutral-200 text-sm truncate">
              {pet.vaccinationStatus}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Adoption Fee
            </span>
            <span className="font-black text-emerald-500 text-sm">
              {Number(pet.adoptionFee) === 0 ? "Free" : `$${pet.adoptionFee}`}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
            Profile History
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium whitespace-pre-line">
            {pet.description ||
              "No supplemental profile description records attached to this layout node."}
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-5 sticky top-6 w-full">
        <div className="p-5 sm:p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm">
          {successState ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <span className="text-4xl animate-bounce">🎉</span>
              <h3 className="font-black text-lg text-neutral-900 dark:text-neutral-50">
                Request Logged
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs font-medium">
                Your application request frame was successfully initialized to
                pending status lines. Routing now...
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmitApplication}
              className="flex flex-col gap-4"
            >
              <div>
                <h3 className="font-black text-lg text-neutral-900 dark:text-neutral-50">
                  Initialize Adoption
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Review credentials and complete matching scheduling tracks.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                  Target Companion
                </label>
                <input
                  type="text"
                  readOnly
                  value={pet.petName}
                  className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-xl font-bold cursor-not-allowed focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                    Applicant Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user.name || "User Node"}
                    className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium cursor-not-allowed focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                    Contact Routing Email
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user.email}
                    className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium cursor-not-allowed focus:outline-none truncate"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-wide">
                  Target Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-wide">
                  Message / Structural Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide supplementary motivation context regarding space, environment layout preparation, or timeline requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium resize-none focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full mt-2 py-3 text-center bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-xs rounded-xl tracking-widest uppercase overflow-hidden group/btn disabled:opacity-50 select-none focus:outline-none shadow-md"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="relative z-10 group-hover/btn:text-white transition-colors">
                  {isSubmitting ? "Processing..." : "Submit Adoption Request"}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
