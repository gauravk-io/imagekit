// Import authentication configuration options
import { authOptions } from "@/lib/auth";

// Import the NextAuth handler to create API routes
import NextAuth from "next-auth";

// Initialize NextAuth with custom auth options
const handler = NextAuth(authOptions);

// Export the same handler for both GET and POST requests (used by NextAuth for sign-in, sign-out, etc.)
export { handler as GET, handler as POST };
