import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function TourOperatorPage({
  params,
}: {
  params: { id: string };
}) {
  const operator = await prisma.user.findUnique({
    where: {
      id: params.id,
      role: "OPERATOR",
    },
    include: {
      operatedTours: {
        include: {
          tourDates: true,
        },
      },
    },
  });

  if (!operator) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          {operator.image && (
            <img
              src={operator.image}
              alt={operator.name || ""}
              className="w-24 h-24 rounded-full mr-6"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold">{operator.name}</h1>
            <p className="text-gray-600">{operator.email}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Tours by this operator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {operator.operatedTours.map((tour) => (
            <div key={tour.id} className="border rounded-lg p-4">
              <img
                src={tour.coverImage}
                alt={tour.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
              <p className="text-gray-600 mb-4">{tour.description}</p>
              <a
                href={`/tours/${tour.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Tour
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
