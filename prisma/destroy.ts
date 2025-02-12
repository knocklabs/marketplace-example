import { PrismaClient } from "@prisma/client";
import { Knock } from "@knocklabs/node";
const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Starting database cleanup...");

  // Helper function to add delay between requests
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  console.log("\n🔔 Cleaning up Knock resources...");

  // Clean up Knock tour objects first
  const tours = await prisma.tour.findMany();
  for (const tour of tours) {
    try {
      await knock.objects.delete("tours", tour.id);
    } catch (error: any) {
      if (error.status === 404) {
        console.log(`Tour object ${tour.id} not found in Knock, skipping...`);
      } else {
        throw error; // Re-throw if it's not a 404 error
      }
    }
    await delay(300); // 300ms delay between requests
  }
  console.log("Finished cleaning up Knock tour objects");

  // Clean up Knock user identities
  const users = await prisma.user.findMany();
  for (const user of users) {
    try {
      await knock.users.delete(user.id);
    } catch (error: any) {
      if (error.status === 404) {
        console.log(`User ${user.id} not found in Knock, skipping...`);
      } else {
        throw error; // Re-throw if it's not a 404 error
      }
    }
    await delay(300); // 300ms delay between requests
  }
  console.log("Finished cleaning up Knock user identities");

  // Clean up any remaining Knock users
  // console.log("\n🔍 Checking for remaining Knock users...");
  // try {
  //   const knockUsers = await knock.users.list();
  //   for (const knockUser of knockUsers.entries) {
  //     try {
  //       await knock.users.delete(knockUser.id);
  //       console.log(`Deleted remaining Knock user: ${knockUser.id}`);
  //     } catch (error: any) {
  //       console.log(
  //         `Error deleting Knock user ${knockUser.id}:`,
  //         error.message
  //       );
  //     }
  //     await delay(300);
  //   }
  //   console.log("Finished cleaning up remaining Knock users");
  // } catch (error: any) {
  //   console.error("Error fetching Knock users:", error.message);
  // }

  // Clean up any remaining Knock tour objects
  console.log("\n🔍 Checking for remaining Knock tour objects...");
  try {
    const knockTours = await knock.objects.list("tours");
    for (const knockTour of knockTours.entries) {
      try {
        await knock.objects.delete("tours", knockTour.id);
        console.log(`Deleted remaining Knock tour object: ${knockTour.id}`);
      } catch (error: any) {
        console.log(
          `Error deleting Knock tour object ${knockTour.id}:`,
          error.message
        );
      }
      await delay(300);
    }
    console.log("Finished cleaning up remaining Knock tour objects");
  } catch (error: any) {
    console.error("Error fetching Knock tour objects:", error.message);
  }

  // Delete all data in reverse order of dependencies
  await prisma.tourBooking.deleteMany();
  console.log("Deleted all tour bookings");

  await prisma.tourDate.deleteMany();
  console.log("Deleted all tour dates");

  await prisma.tour.deleteMany();
  console.log("Deleted all tours");

  // Delete auth related data
  await prisma.session.deleteMany();
  console.log("Deleted all sessions");

  await prisma.account.deleteMany();
  console.log("Deleted all accounts");

  await prisma.verificationToken.deleteMany();
  console.log("Deleted all verification tokens");

  // Delete users last since they're referenced by other models
  await prisma.user.deleteMany();
  console.log("Deleted all users");

  console.log("\n✨ Database cleanup completed successfully!");
}

main()
  .catch((e) => {
    console.error("\n❌ Database cleanup failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Disconnected from database");
  });
