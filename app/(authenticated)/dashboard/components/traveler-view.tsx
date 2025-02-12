import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type TravelerViewProps = {
  user: User | null;
};

export default async function TravelerView({ user }: TravelerViewProps) {
  const bookings = await prisma.tourBooking.findMany({
    where: { userId: user?.id },
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
    },
    orderBy: {
      tourDate: {
        startDate: "asc",
      },
    },
  });

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.tourDate.startDate) > new Date()
  );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.tourDate.startDate) <= new Date()
  );

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Tours</h2>
        {upcomingBookings.length > 0 ? (
          <div className="grid gap-6">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {booking.tourDate.tour.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Dates:</p>
                    <p className="font-medium">
                      {new Date(
                        booking.tourDate.startDate
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(booking.tourDate.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Seats booked:</p>
                    <p className="font-medium">{booking.bookedSeats}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tour operator:</p>
                    <p className="font-medium">
                      {booking.tourDate.tour.operator.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total price:</p>
                    <p className="font-medium">
                      ${booking.bookedSeats * booking.tourDate.price}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href={`/tours/${booking.tourDate.tour.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Tour Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming tours booked.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Past Tours</h2>
        {pastBookings.length > 0 ? (
          <div className="grid gap-6">
            {pastBookings.map((booking) => (
              <div key={booking.id} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {booking.tourDate.tour.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Dates:</p>
                    <p className="font-medium">
                      {new Date(
                        booking.tourDate.startDate
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(booking.tourDate.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Seats booked:</p>
                    <p className="font-medium">{booking.bookedSeats}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href={`/tours/${booking.tourDate.tour.id}`}
                    className="text-gray-600 hover:underline"
                  >
                    View Tour Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No past tours.</p>
        )}
      </section>
    </div>
  );
}
