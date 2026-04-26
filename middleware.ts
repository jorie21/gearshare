import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define route types
  const isAuthRoute = ["/renter-login", "/lender-signup", "/verify", "/setup-password"].includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/inventory");
  const isPublicRoute = ["/", "/items", "/how-it-works"].includes(nextUrl.pathname);

  // 1. If it's an Auth Route (login/signup)
  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect logged-in users away from auth pages
      return Response.redirect(new URL("/", nextUrl));
    }
    return; // Allow access to auth pages if not logged in
  }

  // 2. If it's an Admin/Lender Route
  if (isAdminRoute) {
    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      return Response.redirect(new URL("/renter-login", nextUrl));
    }

    // Role-based protection
    const userRole = req.auth?.user?.role;
    
    // If user is not an admin or lender, they shouldn't be here
    if (userRole !== "admin" && userRole !== "lender") {
      return Response.redirect(new URL("/", nextUrl));
    }
    
    return; // Allow access
  }

  return; // Allow access to all other routes
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
