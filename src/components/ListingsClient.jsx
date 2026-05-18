"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OwnerReqsModal from "./OwnerReqsModal";
import { DeleteModal } from "./DeleteModal";

export default function ListingsClient({
  initialPets,
  allIncomingRequests,
  authToken,
}) {
  const [pets, setPets] = useState(initialPets);
  const [requestsList, setRequestsList] = useState(allIncomingRequests);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalListings = pets.length;
  const adoptedListings = pets.filter(
    (p) => p.status?.toLowerCase() === "adopted",
  ).length;
  const availableListings = totalListings - adoptedListings;

  const handleOpenRequests = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleStatusUpdateInDashboard = (updatedRequest) => {
    setRequestsList((prevRequests) =>
      prevRequests.map((req) => {
        const reqPetId =
          typeof req.petId === "object" ? req.petId?._id : req.petId;
        const updatedPetId =
          typeof updatedRequest.petId === "object"
            ? updatedRequest.petId?._id
            : updatedRequest.petId;

        if (req._id === updatedRequest._id) {
          return { ...req, status: updatedRequest.status };
        }
        if (
          updatedRequest.status?.toLowerCase() === "approved" &&
          reqPetId === updatedPetId
        ) {
          return { ...req, status: "Rejected" };
        }
        return req;
      }),
    );

    if (updatedRequest.status?.toLowerCase() === "approved") {
      const updatedPetId =
        typeof updatedRequest.petId === "object"
          ? updatedRequest.petId?._id
          : updatedRequest.petId;
      setPets((prevPets) =>
        prevPets.map((p) =>
          p._id === updatedPetId ? { ...p, status: "adopted" } : p,
        ),
      );
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      const res = await fetch(`http://localhost:5000/pets/${petId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete pet listing.");
      setPets((prev) => prev.filter((p) => p._id !== petId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div>
        <h2 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
          My Listings
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
          Manage your posted pets and process incoming adoption requests.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
          <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Total Listings
          </p>
          <p className="text-xl font-black text-neutral-900 dark:text-neutral-50 mt-1">
            {totalListings}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
          <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Available
          </p>
          <p className="text-xl font-black text-emerald-500 mt-1">
            {availableListings}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
          <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Adopted
          </p>
          <p className="text-xl font-black text-blue-500 mt-1">
            {adoptedListings}
          </p>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="w-full py-12 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl text-center">
          <p className="text-sm font-bold text-neutral-400 dark:text-neutral-500">
            You haven't listed any pets yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="p-4 flex flex-col gap-3">
                <div className="w-full aspect-video rounded-xl bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60">
                  <Image
                    src={
                      pet.image ||
                      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300"
                    }
                    alt={pet.petName}
                    fill
                    className="object-cover"
                  />
                  {pet.status?.toLowerCase() === "adopted" && (
                    <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center">
                      <span className="bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                        Adopted
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-black text-sm text-neutral-900 dark:text-neutral-50">
                    {pet.petName}
                  </h3>
                  <p className="text-xs font-bold text-emerald-500 mt-0.5">
                    {!pet.adoptionFee || Number(pet.adoptionFee) === 0
                      ? "Free"
                      : `$${pet.adoptionFee}`}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenRequests(pet)}
                  className="col-span-2 py-2 text-center bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-black text-[10px] rounded-xl tracking-wider uppercase transition-colors"
                >
                  Requests
                </button>
                <Link
                  href={`/dashboard/listings/edit/${pet._id}`}
                  className="py-1.5 text-center bg-black hover:bg-neutral-100 dark:bg-neutral-850 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 font-black text-[10px] rounded-lg tracking-wider uppercase transition-colors"
                >
                  Edit
                </Link>
                <Link
                  href={`/pets/${pet._id}`}
                  className="py-1.5 text-center bg-black hover:bg-neutral-100 dark:bg-neutral-850 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 font-black text-[10px] rounded-lg tracking-wider uppercase transition-colors"
                >
                  View
                </Link>
                <div className="col-span-full flex justify-center">
                  <DeleteModal
                    petId={pet._id}
                    petName={pet.petName}
                    handleDelete={handleDeletePet}
                  ></DeleteModal>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPet && (
        <OwnerReqsModal
          isOpen={isModalOpen}
          pet={selectedPet}
          requests={requestsList}
          authToken={authToken}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPet(null);
          }}
          onStatusUpdate={handleStatusUpdateInDashboard}
        />
      )}
    </div>
  );
}
