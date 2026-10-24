"use server";

import { signIn, signOut } from "@/lib/auth";

export async function loginWithGoogleAction() {
  await signIn("google", { redirectTo: "/chat" });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/chat" });
}
