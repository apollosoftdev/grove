import type { NextAuthConfig } from "next-auth";

// Edge-safe Auth.js configuration. This file must NOT import Node-only
// modules (Prisma, bcrypt) because it is also loaded by the middleware,
// which runs on the Edge runtime. The Credentials provider and the Prisma
// adapter are added in `src/auth.ts`.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    // Persist the user id and role onto the JWT at sign-in.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role ?? "USER";
      }
      return token;
    },
    // Expose id and role on the session object for use in the app.
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
