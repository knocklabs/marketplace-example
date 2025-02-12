import { PrismaClient, User } from "@prisma/client";
import OperatorViewModals from "./operator-view-modals";

const prisma = new PrismaClient();

type OperatorViewProps = {
  user: User | null;
};

export default async function OperatorView({ user }: OperatorViewProps) {
  const tours = await prisma.tour.findMany({
    where: { operatorId: user?.id },
    include: {
      tourDates: {
        orderBy: {
          startDate: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return <OperatorViewModals tours={tours} operatorId={user?.id || ""} />;
}
