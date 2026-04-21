import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  // 1. Allow API Auth routes to pass through immediately
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }

  const isLoggedIn = !!req.auth;

  const isAuthRoute = ["/renter-login", "/lender-signup", "/verify", "/setup-password"].includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/inventory");

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return;
  }

  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL("/renter-login", nextUrl));
  }

  // Role-based protection for admin routes
  if (isAdminRoute && isLoggedIn && req.auth?.user?.role !== "admin" && req.auth?.user?.role !== "lender") {
     return Response.redirect(new URL("/", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
