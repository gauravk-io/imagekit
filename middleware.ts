// Import withAuth helper to wrap middleware with NextAuth
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Define and export middleware using NextAuth
export default withAuth(
  function middleware() {
    // Continue to next middleware or route handler
    return NextResponse.next();
  },
  {
    callbacks: {
      // Callback to check if the user is authorized to access the route
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Allow unauthenticated access to auth routes, login, and register
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        )
          return true;

        // Allow unauthenticated access to home page and video API
        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }

        // For all other routes, require valid session token
        return !!token;
      },
    },
  }
);

// Define paths the middleware should apply to
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (Next.js static files)
     * - _next/image (Next.js image optimization)
     * - favicon.ico (favicon request)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
