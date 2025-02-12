/* eslint-disable @next/next/no-img-element */

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import TravelerView from "./components/traveler-view";
import OperatorView from "./components/operator-view";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  const userRole = user?.role || "traveler";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>

      {userRole === "TRAVELER" ? (
        <TravelerView user={user} />
      ) : userRole === "OPERATOR" ? (
        <OperatorView user={user} />
      ) : (
        <div>Unknown role</div>
      )}
    </div>
  );
}
