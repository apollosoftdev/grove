import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// A lightweight, Edge-compatible Auth.js instance (no Prisma adapter or
// Credentials provider) used purely to read the session in middleware.
const { auth } = NextAuth(authConfig);

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/dashboard", "/admin"];
const ADMIN_ROUTES = ["/admin"];

const matches = (path: string, routes: string[]) =>
  routes.some((route) => path === route || path.startsWith(`${route}/`));

export default auth((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isLoggedIn = Boolean(req.auth?.user);
  const role = req.auth?.user?.role;

  // Signed-in users have no business on the login/register pages.
  if (matches(path, AUTH_ROUTES) && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  // Gate protected routes behind authentication.
  if (matches(path, PROTECTED_ROUTES) && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(`${path}${nextUrl.search}`);
    return Response.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl),
    );
  }

  // Gate admin routes behind the ADMIN role.
  if (matches(path, ADMIN_ROUTES) && isLoggedIn && role !== "ADMIN") {
    return Response.redirect(new URL("/dashboard?error=forbidden", nextUrl));
  }
});

export const config = {
  // Run middleware on everything except Next internals and static assets.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
