// Import mongoose to handle MongoDB connection
import mongoose from "mongoose";

// Load MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI!

// Throw error if the URI is not set
if (!MONGODB_URI) {
    throw new Error("Please define mongo_uri in new variables");
}

// Try to access an existing cached connection from the global object
let cached = global.mongoose

// If no cache exists, initialize it
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

// Function to connect to the MongoDB database
export async function connectToDatabase() {
    // If already connected, return the existing connection
    if (cached.conn) {
        return cached.conn
    }

    // If not already connecting, start a new connection
    if (!cached.promise) {
        const opts = {
            bufferCommands: true, // Allows commands to be queued while connecting
            maxPoolSize: 10       // Limit number of concurrent MongoDB connections
        }

        // Start the connection (note: promise is not cached here)
        mongoose
            .connect(MONGODB_URI, opts)
            .then(() => mongoose.connection)
    }

    try {
        // Wait for the connection to be ready
        cached.conn = await cached.promise
    } catch (error) {
        // Reset promise if connection failed
        cached.promise = null
        throw error
    }

    // Return the active connection
    return cached.conn
}