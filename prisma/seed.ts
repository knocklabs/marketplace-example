import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { hash } from "bcrypt";
import { Knock } from "@knocklabs/node";
const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);

async function main() {
  const defaultPassword = await hash("password123", 12);

  console.log("🌱 Starting to seed database...");
  console.log("\n👥 Creating operators and travelers...");

  // Create sample users
  const admin = await prisma.user.create({
    data: {
      email: "admin@globewonder.com",
      name: "Admin User",
      role: "ADMIN",
      password: defaultPassword,
    },
  });
  await knock.users.identify(admin.id, {
    email: admin.email as string,
    name: admin.name as string,
    role: admin.role,
  });

  const operator1 = await prisma.user.create({
    data: {
      email: "alps.adventures@example.com",
      name: "Alps Adventures",
      role: "OPERATOR",
      password: defaultPassword,
    },
  });
  await knock.users.identify(operator1.id, {
    email: operator1.email as string,
    name: operator1.name as string,
    role: operator1.role,
  });

  const operator2 = await prisma.user.create({
    data: {
      email: "safari.experts@example.com",
      name: "Safari Experts",
      role: "OPERATOR",
      password: defaultPassword,
    },
  });
  await knock.users.identify(operator2.id, {
    email: operator2.email as string,
    name: operator2.name as string,
    role: operator2.role,
  });

  const operator3 = await prisma.user.create({
    data: {
      email: "amazon.explorers@example.com",
      name: "Amazon Explorers",
      role: "OPERATOR",
      password: defaultPassword,
    },
  });
  await knock.users.identify(operator3.id, {
    email: operator3.email as string,
    name: operator3.name as string,
    role: operator3.role,
  });

  const traveler = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      name: "John Doe",
      role: "TRAVELER",
      password: defaultPassword,
    },
  });
  await knock.users.identify(traveler.id, {
    email: traveler.email as string,
    name: traveler.name as string,
    role: traveler.role,
  });

  console.log("\n🏔️ Creating tours and tour dates...");

  // Create sample tours
  const alpsTour = await prisma.tour.create({
    data: {
      name: "Swiss Alps Adventure",
      description:
        "Experience the majestic Swiss Alps with our guided hiking tour",
      coverImage: "/assets/tours/swiss-alps-adventure.png",
      difficultyLevel: "Intermediate",
      climate: "Alpine",
      operatorId: operator1.id,
      tourDates: {
        create: [
          {
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-06-08"),
            price: 1999.99,
            availableSeats: 12,
          },
          {
            startDate: new Date("2025-07-01"),
            endDate: new Date("2025-07-08"),
            price: 2199.99,
            availableSeats: 12,
          },
        ],
      },
    },
    include: { operator: true },
  });
  await knock.objects.set("tours", alpsTour.id, {
    name: alpsTour.name,
    description: alpsTour.description,
    difficultyLevel: alpsTour.difficultyLevel,
    climate: alpsTour.climate,
    operatorName: alpsTour.operator.name,
  });

  const serenegetiTour = await prisma.tour.create({
    data: {
      name: "Serengeti Safari",
      description: "Witness the great migration in the Serengeti",
      coverImage: "/assets/tours/serengeti-safari.png",
      difficultyLevel: "Easy",
      climate: "Tropical",
      operatorId: operator2.id,
      tourDates: {
        create: [
          {
            startDate: new Date("2025-07-01"),
            endDate: new Date("2025-07-08"),
            price: 3499.99,
            availableSeats: 8,
          },
        ],
      },
    },
    include: { operator: true },
  });
  await knock.objects.set("tours", serenegetiTour.id, {
    name: serenegetiTour.name,
    description: serenegetiTour.description,
    difficultyLevel: serenegetiTour.difficultyLevel,
    climate: serenegetiTour.climate,
    operatorName: serenegetiTour.operator.name,
  });

  const amazonTour = await prisma.tour.create({
    data: {
      name: "Amazon Rainforest Expedition",
      description:
        "Explore the biodiversity of the Amazon rainforest with expert naturalists",
      coverImage: "/assets/tours/amazon-rainforest-expedition.png",
      difficultyLevel: "Intermediate",
      climate: "Tropical",
      operatorId: operator3.id,
      tourDates: {
        create: [
          {
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-06-08"),
            price: 2499.99,
            availableSeats: 10,
          },
          {
            startDate: new Date("2025-08-01"),
            endDate: new Date("2025-08-08"),
            price: 2599.99,
            availableSeats: 10,
          },
        ],
      },
    },
    include: { operator: true },
  });
  await knock.objects.set("tours", amazonTour.id, {
    name: amazonTour.name,
    description: amazonTour.description,
    difficultyLevel: amazonTour.difficultyLevel,
    climate: amazonTour.climate,
    operatorName: amazonTour.operator.name,
  });

  const icelandTour = await prisma.tour.create({
    data: {
      name: "Iceland Northern Lights",
      description:
        "Chase the aurora borealis and explore Iceland's dramatic landscapes",
      coverImage: "/assets/tours/iceland-northern-lights.png",
      difficultyLevel: "Easy",
      climate: "Arctic",
      operatorId: operator1.id,
      tourDates: {
        create: [
          {
            startDate: new Date("2025-07-01"),
            endDate: new Date("2025-07-07"),
            price: 2899.99,
            availableSeats: 15,
          },
        ],
      },
    },
    include: { operator: true },
  });
  await knock.objects.set("tours", icelandTour.id, {
    name: icelandTour.name,
    description: icelandTour.description,
    difficultyLevel: icelandTour.difficultyLevel,
    climate: icelandTour.climate,
    operatorName: icelandTour.operator.name,
  });

  const masaiMaraTour = await prisma.tour.create({
    data: {
      name: "Masai Mara Photography Safari",
      description:
        "Capture stunning wildlife photography in Kenya's premier reserve",
      coverImage: "/assets/tours/masai-mara-photography-safari.png",
      difficultyLevel: "Easy",
      climate: "Tropical",
      operatorId: operator2.id,
      tourDates: {
        create: [
          {
            startDate: new Date("2025-06-15"),
            endDate: new Date("2025-06-22"),
            price: 3799.99,
            availableSeats: 6,
          },
          {
            startDate: new Date("2025-07-15"),
            endDate: new Date("2025-07-22"),
            price: 3899.99,
            availableSeats: 6,
          },
        ],
      },
    },
    include: { operator: true },
  });
  await knock.objects.set("tours", masaiMaraTour.id, {
    name: masaiMaraTour.name,
    description: masaiMaraTour.description,
    difficultyLevel: masaiMaraTour.difficultyLevel,
    climate: masaiMaraTour.climate,
    operatorName: masaiMaraTour.operator.name,
  });

  const kilimanjaroTour = await prisma.tour.create({
    data: {
      name: "Kilimanjaro Summit Trek",
      description: "Conquer Africa's highest peak via the scenic Machame Route",
      coverImage: "/assets/tours/kilimanjaro-summit-trek.png",
      difficultyLevel: "Advanced",
      climate: "Alpine",
      operatorId: operator2.id,
      tourDates: {
        create: [
          {
            startDate: new Date("2025-08-15"),
            endDate: new Date("2025-08-23"),
            price: 4299.99,
            availableSeats: 8,
          },
        ],
      },
    },
    include: { operator: true },
  });
  await knock.objects.set("tours", kilimanjaroTour.id, {
    name: kilimanjaroTour.name,
    description: kilimanjaroTour.description,
    difficultyLevel: kilimanjaroTour.difficultyLevel,
    climate: kilimanjaroTour.climate,
    operatorName: kilimanjaroTour.operator.name,
  });

  // Create a sample booking
  const tourDate = await prisma.tourDate.findFirst({
    where: { tourId: alpsTour.id },
  });

  if (tourDate) {
    await prisma.tourBooking.create({
      data: {
        tourDateId: tourDate.id,
        userId: traveler.id,
        tourId: alpsTour.id,
        bookedSeats: 2,
      },
    });
  }

  console.log("\n✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
