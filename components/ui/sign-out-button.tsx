import { signOut } from "@/auth";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Sign out
      </button>
    </form>
  );
}
