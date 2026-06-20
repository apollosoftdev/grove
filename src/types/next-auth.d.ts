import type { Role } from "@/generated/prisma/enums";
import type { DefaultSession } from "next-auth";

// Augment Auth.js types so `session.user.id` / `session.user.role`
// and the JWT carry our custom fields with full type-safety.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
