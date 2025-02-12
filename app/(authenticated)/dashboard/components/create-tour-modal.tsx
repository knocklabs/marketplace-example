"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CreateTourModalProps = {
  isOpen: boolean;
  onClose: () => void;
  operatorId: string;
};

export default function CreateTourModal({
  isOpen,
  onClose,
  operatorId,
}: CreateTourModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    duration: "",
    price: "",
    maxGroupSize: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          operatorId,
          price: parseFloat(formData.price),
          maxGroupSize: parseInt(formData.maxGroupSize),
        }),
      });

      if (!response.ok) throw new Error("Failed to create tour");

      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error creating tour:", error);
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
        <h2 className="text-2xl font-semibold mb-4">Create New Tour</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tour Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="maxGroupSize"
                className="block text-sm font-medium text-gray-700"
              >
                Max Group Size
              </label>
              <input
                type="number"
                id="maxGroupSize"
                required
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.maxGroupSize}
                onChange={(e) =>
                  setFormData({ ...formData, maxGroupSize: e.target.value })
                }
              />
            </div>
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
              {isSubmitting ? "Creating..." : "Create Tour"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
