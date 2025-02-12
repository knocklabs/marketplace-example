import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { NotificationProvider } from "./providers/notification-provider";
import { UserNav } from "./dashboard/components/user-nav";
import { NotificationFeedWrapper } from "./dashboard/components/notification-feed-wrapper";
import Link from "next/link";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <NotificationProvider userId={session?.user?.id || ""}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/">
              <h1 className="text-xl font-semibold text-gray-900">
                Globe Wander
              </h1>
            </Link>

            <div className="flex items-center gap-4">
              <NotificationFeedWrapper />
              <UserNav currentUser={session.user} />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </NotificationProvider>
  );
}
