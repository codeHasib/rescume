"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const BASE_API_URL = "https://rescume-backend.vercel.app";

export default function PetDetails({
  pet,
  user,
  authToken,
  isOwner,
  existingRequests = [],
}) {
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successState, setSuccessState] = useState(false);

  const isAdopted = pet?.status?.toLowerCase() === "adopted";

  const targetDateConstraint = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const userApplicationNode = existingRequests.find(
    (req) => req.petId === pet._id && req.applicantEmail === user?.email,
  );

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

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!pickupDate || isOwner || userApplicationNode || isAdopted) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${BASE_API_URL}/requests`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: pet._id,
          petName: pet.petName,
          petImage: pet.image,
          applicantName: user?.name,
          applicantEmail: user?.email,
          pickupDate,
          requestDate: new Date().toISOString(),
          message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Could not submit adoption data.");
      }

      setSuccessState(true);
      setTimeout(() => {
        router.push("/dashboard/requests");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
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
            {pet.breed || "Mixed Breed"} &bull;{" "}
            {pet.location || "Unknown Location"}
          </p>
        </div>

        <div className="w-full aspect-[4/3] rounded-3xl bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs">
          <Image
            src={
              pet.image ||
              "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600"
            }
            alt={pet.petName || "Pet Picture"}
            fill
            priority
            className="object-cover"
          />
          {isAdopted && (
            <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center select-none">
              <span className="bg-blue-500 text-white font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                Adopted
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-neutral-50 dark:bg-neutral-900/40 p-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Age
            </span>
            <span className="font-black text-neutral-800 dark:text-neutral-200 text-sm">
              {pet.age || "N/A"}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Gender
            </span>
            <span className="font-black text-neutral-800 dark:text-neutral-200 text-sm">
              {pet.gender || "N/A"}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Vaccination
            </span>
            <span className="font-black text-neutral-800 dark:text-neutral-200 text-sm truncate">
              {pet.vaccinationStatus || "Pending"}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
              Adoption Fee
            </span>
            <span className="font-black text-emerald-500 text-sm">
              {!pet.adoptionFee || Number(pet.adoptionFee) === 0
                ? "Free"
                : `$${pet.adoptionFee}`}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
            Description
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium whitespace-pre-line">
            {pet.description || "No description provided for this pet listing."}
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-5 sticky top-6 w-full">
        <div className="p-5 sm:p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm">
          {isAdopted ? (
            <div className="py-8 text-center flex flex-col items-center gap-4 select-none">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-xl shadow-xs">
                🎉
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-black text-base text-blue-500 uppercase tracking-wide">
                  Already Adopted
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed font-medium">
                  This pet has already found a loving family. The application
                  pipeline is permanently closed for this profile.
                </p>
              </div>
            </div>
          ) : isOwner ? (
            <div className="py-6 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center text-lg select-none">
                👋
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-black text-base text-neutral-900 dark:text-neutral-50">
                  Your Listing
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed font-medium">
                  You are registered as the owner of{" "}
                  <strong>{pet.petName}</strong>. The adoption form is disabled
                  for your own listings.
                </p>
              </div>
              <Link
                href="/dashboard/listings"
                className="w-full mt-2 py-2.5 text-center bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs rounded-xl tracking-wider uppercase transition-colors"
              >
                Manage My Listings
              </Link>
            </div>
          ) : userApplicationNode ? (
            <div className="py-6 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center text-lg select-none">
                📂
              </div>
              <div className="flex flex-col gap-1 items-center">
                <h3 className="font-black text-base text-neutral-900 dark:text-neutral-50">
                  Application Logged
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed font-medium mb-2">
                  You have already initialized an active adoption application
                  thread route for this companion node.
                </p>
                <span
                  className={`px-3 py-1 font-black text-[10px] uppercase tracking-wider border rounded-full select-none ${getStatusStyle(
                    userApplicationNode.status,
                  )}`}
                >
                  {userApplicationNode.status || "pending"}
                </span>
              </div>
              <Link
                href="/dashboard/requests"
                className="w-full mt-2 py-2.5 text-center bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs rounded-xl tracking-wider uppercase transition-colors"
              >
                View My Applications
              </Link>
            </div>
          ) : successState ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <span className="text-4xl animate-bounce">🎉</span>
              <h3 className="font-black text-lg text-neutral-900 dark:text-neutral-50">
                Request Submitted
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs font-medium">
                Your request is now marked as pending. Redirecting to your
                dashboard...
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmitApplication}
              className="flex flex-col gap-4"
            >
              <div>
                <h3 className="font-black text-lg text-neutral-900 dark:text-neutral-50">
                  Adopt {pet.petName}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Please review your profile details below to complete your
                  request.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                  Pet Name
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
                    Your Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user?.name || "Adopter"}
                    className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium cursor-not-allowed focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                    Your Email
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user?.email || ""}
                    className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium cursor-not-allowed focus:outline-none truncate"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-wide">
                  Preferred Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  min={targetDateConstraint()}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl font-medium focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-900 dark:text-neutral-300 uppercase tracking-wide">
                  Message to Owner
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell the owner a bit about yourself, your home setup, or ask any burning questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
