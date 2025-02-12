"use server";

import { auth } from "@/auth";
import { knock } from "@/lib/knock";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createNewBooking(formData: FormData) {
  const tourId = formData.get("tourId") as string;
  const dateId = formData.get("dateId") as string;
  const seats = Number(formData.get("seats"));

  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const booking = await prisma.tourBooking.create({
    data: {
      tourId,
      tourDateId: dateId,
      bookedSeats: seats,
      userId: session.user.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
        },
      },
      tour: true,
      tourDate: true,
    },
  });
  console.log(booking);
  //trigger 'tour-booked' workflow
  await knock.workflows.trigger("tour-booked", {
    recipients: [booking.userId, booking.tour.operatorId],
    data: {
      ...booking,
    },
    cancellationKey: booking.id,
  });

  redirect(`/booking-confirmation?bookingId=${booking.id}`);
}
