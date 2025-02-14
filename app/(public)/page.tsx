import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const tours = await prisma.tour.findMany({
    include: {
      operator: true,
      tourDates: true,
    },
    take: 6,
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="/hero-image.png" // You'll need to add a hero image
            alt="Adventure background"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">DO WILD THINGS</h1>
            <p className="text-xl mb-8">
              Join solo-friendly, expert-led outdoor adventures
            </p>
            <Link
              href="/tours"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold inline-block"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-8 mb-8">
          <button className="text-lg font-semibold border-b-2 border-blue-500">
            DESTINATIONS
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={tour.coverImage}
                alt={tour.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold">{tour.name}</h3>
                <p className="text-sm">{tour.operator.name}</p>
              </div>
              <a
                href={`/tours/${tour.id}`}
                className="absolute inset-0"
                aria-label={`View ${tour.name}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
