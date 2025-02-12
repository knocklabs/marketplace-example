import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ToursPage() {
  const tours = await prisma.tour.findMany({
    include: {
      operator: true,
      tourDates: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">All Tours</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="border rounded-lg p-4 shadow">
            <img
              src={tour.coverImage}
              alt={tour.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{tour.name}</h2>
            <p className="text-gray-600 mb-2">{tour.description}</p>
            <div className="flex flex-col gap-2">
              <div className="text-sm">
                <span className="font-semibold">Difficulty:</span>{" "}
                {tour.difficultyLevel}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Climate:</span> {tour.climate}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Operator:</span>{" "}
                {tour.operator.name}
              </div>
            </div>
            <a
              href={`/tours/${tour.id}`}
              className="block mt-4 bg-blue-500 text-white text-center px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
