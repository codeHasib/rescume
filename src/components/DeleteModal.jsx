"use client";

import React, { useState } from "react";
import { Delete } from "@gravity-ui/icons";

export function DeleteModal({ petId, handleDelete, petName }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const onConfirmDelete = () => {
    handleDelete(petId);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-500 transition-all bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg active:scale-95"
      >
        <Delete className="w-4 h-4" />
        Remove Listing
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={toggleModal}
          />

          <div className="relative w-full max-w-[380px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden animate-in zoom-in-95 duration-200">

            <div className="flex flex-col items-center pt-8 pb-4">
              <div className="flex items-center justify-center w-14 h-14 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full mb-4">
                <Delete className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Delete Listing
              </h3>
            </div>

            <div className="px-6 pb-6 text-center">
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                This action cannot be undone. Are you sure you want to
                permanently remove
                <span className="block mt-1 font-bold text-neutral-900 dark:text-neutral-100">
                  "{petName}"
                </span>
              </p>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={toggleModal}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors"
              >
                Keep it
              </button>
              <button
                onClick={onConfirmDelete}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-lg shadow-rose-500/20 transition-all active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
