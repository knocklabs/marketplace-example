"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An error occurred";
  if (error === "CredentialsSignin") {
    errorMessage = "Invalid email or password";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Error</h2>
          <p className="mt-2 text-red-600">{errorMessage}</p>
        </div>
        <div>
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-500 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
