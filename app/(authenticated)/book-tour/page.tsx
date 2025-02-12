import { createNewBooking } from "@/app/actions/create-new-booking";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BookTourPage({
  searchParams,
}: {
  searchParams: { tourId: string; dateId: string };
}) {
  const tourDate = await prisma.tourDate.findUnique({
    where: { id: searchParams.dateId },
    include: {
      tour: {
        include: {
          operator: true,
        },
      },
    },
  });

  if (!tourDate) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Book Your Tour</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{tourDate.tour.name}</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Tour Dates:</p>
              <p className="font-medium">
                {new Date(tourDate.startDate).toLocaleDateString()} -{" "}
                {new Date(tourDate.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Price per person:</p>
              <p className="font-medium">${tourDate.price}</p>
            </div>
            <div>
              <p className="text-gray-600">Available seats:</p>
              <p className="font-medium">{tourDate.availableSeats}</p>
            </div>
          </div>
        </div>

        <form action={createNewBooking} className="space-y-6">
          <input type="hidden" name="tourId" value={tourDate.tour.id} />
          <input type="hidden" name="dateId" value={tourDate.id} />

          <div>
            <label
              htmlFor="seats"
              className="block text-sm font-medium text-gray-700"
            >
              Number of seats
            </label>
            <select
              name="seats"
              id="seats"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              required
            >
              {Array.from(
                { length: tourDate.availableSeats },
                (_, i) => i + 1
              ).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "seat" : "seats"}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
