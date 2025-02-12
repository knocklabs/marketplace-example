import Link from "next/link";
import { auth } from "@/auth";
import { UserNav } from "../(authenticated)/dashboard/components/user-nav";
import { NotificationFeedWrapper } from "../(authenticated)/dashboard/components/notification-feed-wrapper";
import { NotificationProvider } from "../(authenticated)/providers/notification-provider";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-2xl">Globe Wander</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {session?.user ? (
            <NotificationProvider userId={session.user.id || ""}>
              <div className="flex items-center gap-4">
                <NotificationFeedWrapper />
                <UserNav currentUser={session.user} />
              </div>
            </NotificationProvider>
          ) : (
            <>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/login"
              >
                Log in
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/signup"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </header>
      {children}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Globe Wander. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
