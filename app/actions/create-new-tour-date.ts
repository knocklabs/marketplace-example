"use server";

import { knock } from "@/lib/knock";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateTourDateInput = {
  tourId: string;
  startDate: string;
  endDate: string;
  price: number;
  availableSeats: number;
};

export async function createNewTourDate(data: CreateTourDateInput) {
  try {
    const tourDate = await prisma.tourDate.create({
      data: {
        tourId: data.tourId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        price: data.price,
        availableSeats: data.availableSeats,
      },
    });

    await knock.workflows.trigger("tour-dates-added", {
      recipients: [{ id: data.tourId, collection: "tours" }],
      data: {
        tourId: data.tourId,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: tourDate };
  } catch (error) {
    console.error("Failed to create tour date:", error);
    return { success: false, error: "Failed to create tour date" };
  }
}
