"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewTourDate } from "@/app/actions/create-new-tour-date";

type AddTourDateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tourId: string;
};

export default function AddTourDateModal({
  isOpen,
  onClose,
  tourId,
}: AddTourDateModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    price: "",
    availableSeats: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createNewTourDate({
        tourId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        price: parseFloat(formData.price),
        availableSeats: parseInt(formData.availableSeats),
      });

      if (!result.success) throw new Error(result.error);

      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error creating tour date:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <dialog
      className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center p-4"
      open
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add Tour Date</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price per Person
            </label>
            <input
              type="number"
              id="price"
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="availableSeats"
              className="block text-sm font-medium text-gray-700"
            >
              Available Seats
            </label>
            <input
              type="number"
              id="availableSeats"
              required
              min="1"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.availableSeats}
              onChange={(e) =>
                setFormData({ ...formData, availableSeats: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Tour Date"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
