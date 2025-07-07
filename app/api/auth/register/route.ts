import { connectToDatabase } from "@/lib/db"; // Connects to the database
import User from "@/models/User"; // Imports the User model
import { error } from "console"; // Imports error from console
import { NextRequest, NextResponse } from "next/server"; // Imports types for request and response

// Handles POST requests for user registration
export async function POST(request: NextRequest) {
    try {
        // Parses the request body to get email and password
        const { email, password } = await request.json()

        // Checks if email or password is missing
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            )
        }

        // Connects to the database
        await connectToDatabase()

        // Checks if a user with the same email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { error: "User already registered" },
                { status: 400 }
            );
        }

        // Creates a new user with the provided email and password
        await User.create({
            email,
            password
        })

        // Sends a success message after user registration
        return NextResponse.json(
            { message: "User registered successfull" },
            { status: 400 }
        );

    } catch (error) {
        // Logs registration error to the console
        console.error("Registration error")

        // Sends an error response if registration fails
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 400 }
        );
    }
}
