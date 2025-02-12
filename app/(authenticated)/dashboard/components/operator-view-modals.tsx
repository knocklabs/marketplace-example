"use client";

import { useState } from "react";
import CreateTourModal from "./create-tour-modal";
import AddTourDateModal from "./add-tour-date-modal";
import { Tour } from "@prisma/client";

type OperatorViewModalsProps = {
  tours: Tour[];
  operatorId: string;
};

export default function OperatorViewModals({
  tours,
  operatorId,
}: OperatorViewModalsProps) {
  const [isCreateTourModalOpen, setIsCreateTourModalOpen] = useState(false);
  const [isAddTourDateModalOpen, setIsAddTourDateModalOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Tours</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => setIsCreateTourModalOpen(true)}
        >
          Create New Tour
        </button>
      </div>

      <div className="grid gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{tour.name}</h3>
                <p className="text-gray-600">{tour.description}</p>
              </div>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                onClick={() => {
                  setSelectedTourId(tour.id);
                  setIsAddTourDateModalOpen(true);
                }}
              >
                Add Tour Date
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Tour Dates:</h4>
              {tour.tourDates?.length > 0 ? (
                <div className="grid gap-3">
                  {tour.tourDates.map((date) => (
                    <div
                      key={date.id}
                      className="bg-gray-50 p-3 rounded-lg grid grid-cols-3 gap-4"
                    >
                      <div>
                        <p className="text-gray-600">Dates:</p>
                        <p className="font-medium">
                          {new Date(date.startDate).toLocaleDateString()} -{" "}
                          {new Date(date.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price:</p>
                        <p className="font-medium">${date.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Available Seats:</p>
                        <p className="font-medium">{date.availableSeats}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No tour dates scheduled.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {tours.length === 0 && (
        <div className="text-center text-gray-600">
          <p>You haven&apos;t created any tours yet.</p>
          <p>Click the &quot;Create New Tour&quot; button to get started!</p>
        </div>
      )}

      <CreateTourModal
        isOpen={isCreateTourModalOpen}
        onClose={() => setIsCreateTourModalOpen(false)}
        operatorId={operatorId}
      />

      <AddTourDateModal
        isOpen={isAddTourDateModalOpen}
        onClose={() => {
          setIsAddTourDateModalOpen(false);
          setSelectedTourId(null);
        }}
        tourId={selectedTourId || ""}
      />
    </div>
  );
}
