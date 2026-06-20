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

// The JWT interface lives in @auth/core/jwt; next-auth/jwt only re-exports it,
// so augmenting it here is what actually merges with the real type.
declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
