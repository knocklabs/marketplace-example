// Add the server action
import { auth } from "@/auth";
import { Knock } from "@knocklabs/node";
import { revalidatePath } from "next/cache";
const knock = new Knock(process.env.KNOCK_SECRET_API_KEY!);

export async function createNewSubscription(tourId: string, userId: string) {
  "use server";

  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Must be logged in");
  }

  // Create a subscription in Knock for the user to the tour
  await knock.objects.addSubscriptions("tours", tourId, {
    recipients: [userId],
    properties: {}, // Optional custom properties
  });

  revalidatePath(`/tours/${tourId}`);
}

export async function checkSubscription(
  tourId: string,
  userId: string
): Promise<boolean> {
  "use server";

  const session = await auth();
  if (!session?.user?.id) {
    return false;
  }

  const subscriptions = await knock.users.getSubscriptions(userId, {
    objects: [{ collection: "tours", id: tourId }],
  });

  return subscriptions.entries.length > 0;
}

export async function removeSubscription(tourId: string, userId: string) {
  "use server";

  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Must be logged in");
  }

  // Remove the subscription in Knock for the user from the tour
  await knock.objects.deleteSubscriptions("tours", tourId, {
    recipients: [userId],
  });

  revalidatePath(`/tours/${tourId}`);
}
