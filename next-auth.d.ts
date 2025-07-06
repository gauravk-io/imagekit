// Import NextAuth types and the default session structure
import NextAuth, { DefaultSession } from "next-auth";

// Extend the default NextAuth session interface
declare module "next-auth" {
    interface Session {
        // Add a custom `id` field to the user object in the session
        user: {
            id: string;
        } & DefaultSession["user"]; // Merge it with the default user fields like name, email, etc.
    }
}