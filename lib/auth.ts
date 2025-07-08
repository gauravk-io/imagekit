import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";

import User from "@/models/User";

import bcrypt from "bcryptjs";

// Configuration options for NextAuth
export const authOptions: NextAuthOptions = {
    // Define authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials", // Provider name shown in UI
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            // Function to authorize user based on credentials
            async authorize(credentials) {
                // If email or password is missing, throw error
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                try {
                    // Connect to database
                    await connectToDatabase();

                    // Find user by email
                    const user = await User.findOne({ email: credentials.email });

                    // If no user found, throw error
                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    // Compare entered password with hashed password
                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    // If password doesn't match, throw error
                    if (!isValid) {
                        throw new Error("Invalid password");
                    }

                    // If successful, return minimal user object
                    return {
                        id: user._id.toString(),
                        email: user.email
                    };

                } catch (error) {
                    // Log any error during authentication
                    console.error("Auth error: error");
                    throw error;
                }
            },
        }),
    ],

    // JWT and session callbacks
    callbacks: {
        // Called when JWT token is created or updated
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        // Called when session is created
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },

    // Custom routes for sign-in and error pages
    pages: {
        signIn: "/login",
        error: "/login",
    },

    // Use JWT-based sessions
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    // Secret for signing JWT and encrypting session
    secret: process.env.NEXTAUTH_SECRET,
};
