import { redirect } from "next/navigation";

import { auth } from "@/auth";

// Server-side authorization guards. Middleware provides a first line of
// defense, but these are the authoritative checks for protected pages,
// layouts, and server actions (defense in depth).

export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard?error=forbidden");
  }
  return session;
}
