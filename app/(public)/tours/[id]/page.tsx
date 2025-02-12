import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  checkSubscription,
  createNewSubscription,
  removeSubscription,
} from "@/app/actions/create-new-subscription";

const prisma = new PrismaClient();

export default async function TourDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const tour = await prisma.tour.findUnique({
    where: { id: params.id },
    include: {
      operator: true,
      tourDates: {
        orderBy: { startDate: "asc" },
      },
    },
  });

  if (!tour) {
    notFound();
  }
  const isSubscribed = await checkSubscription(
    tour.id,
    session?.user?.id as string
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <img
          src={tour.coverImage}
          alt={tour.name}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">{tour.name}</h1>
          {session?.user && (
            <form
              action={async () => {
                "use server";
                if (isSubscribed) {
                  await removeSubscription(
                    tour.id,
                    session?.user?.id as string
                  );
                } else {
                  await createNewSubscription(
                    tour.id,
                    session?.user?.id as string
                  );
                }
              }}
            >
              <button
                type="submit"
                className={`px-4 py-2 rounded ${
                  isSubscribed
                    ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white`}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe to Updates"}
              </button>
            </form>
          )}
        </div>
        <p className="text-gray-600 mb-6">{tour.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <h3 className="font-semibold">Difficulty Level</h3>
            <p>{tour.difficultyLevel}</p>
          </div>
          <div>
            <h3 className="font-semibold">Climate</h3>
            <p>{tour.climate}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tour Dates</h2>
          <div className="space-y-4">
            {tour.tourDates.map((date) => (
              <div
                key={date.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {new Date(date.startDate).toLocaleDateString()} -{" "}
                    {new Date(date.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    {date.availableSeats} seats available
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold">${date.price}</p>
                  <a
                    href={`/book-tour?tourId=${tour.id}&dateId=${date.id}`}
                    className="block mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Tour Operator</h2>
          <div className="flex items-center">
            {tour.operator.image && (
              <img
                src={tour.operator.image}
                alt={tour.operator.name || ""}
                className="w-16 h-16 rounded-full mr-4"
              />
            )}
            <div>
              <p className="font-semibold">{tour.operator.name}</p>
              <a
                href={`/tour-operators/${tour.operator.id}`}
                className="text-blue-500 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
