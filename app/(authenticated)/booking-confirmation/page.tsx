import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: { bookingId: string };
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const booking = await prisma.tourBooking.findUnique({
    where: { id: searchParams.bookingId },
    include: {
      tourDate: {
        include: {
          tour: {
            include: {
              operator: true,
            },
          },
        },
      },
      user: true,
    },
  });

  if (!booking || booking.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-green-700">
            Your tour booking has been successfully confirmed.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Booking Details</h2>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Tour:</p>
              <p className="font-medium">{booking.tourDate.tour.name}</p>
            </div>

            <div>
              <p className="text-gray-600">Dates:</p>
              <p className="font-medium">
                {new Date(booking.tourDate.startDate).toLocaleDateString()} -{" "}
                {new Date(booking.tourDate.endDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Number of seats:</p>
              <p className="font-medium">{booking.bookedSeats}</p>
            </div>

            <div>
              <p className="text-gray-600">Total price:</p>
              <p className="font-medium">
                ${booking.bookedSeats * booking.tourDate.price}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Tour operator:</p>
              <p className="font-medium">
                {booking.tourDate.tour.operator.name}
              </p>
            </div>
          </div>

          <div className="mt-8 space-x-4">
            <a
              href="/dashboard"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Dashboard
            </a>
            <a
              href={`/tours/${booking.tourDate.tour.id}`}
              className="text-blue-500 hover:underline"
            >
              View Tour Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
