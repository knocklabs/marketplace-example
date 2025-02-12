// app/actions/authenticate.ts
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

type State = {
  error: string | null;
  attempted: boolean;
};

export async function authenticate(formData: FormData): Promise<State> {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      return {
        error: "Invalid credentials",
        attempted: true,
      };
    }
    // Redirect to the specific workspace dashboard
    redirect(`/dashboard`);
  } catch (error) {
    console.error("Authentication error:", error);
    if (error instanceof AuthError) {
      return {
        error: "Invalid credentials",
        attempted: true,
      };
    }
    throw error;
  }
}
