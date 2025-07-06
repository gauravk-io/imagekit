// Import the Connection type from mongoose
import { Connection } from "mongoose";

/**
 * Declare a global variable for mongoose connection caching.
 * 
 * WHY:
 * - In serverless environments (like Vercel or Next.js API routes),
 *   the code can be executed multiple times.
 * - Reconnecting to MongoDB every time can cause performance issues or connection limits.
 * - So we use a globally cached connection object.
 * 
 * WHAT:
 * - `global.mongoose.conn`: holds the actual connection if already established.
 * - `global.mongoose.promise`: holds the promise during initial connection.
 * 
 * This ensures we reuse the existing connection if available.
 */
declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    };
}

// Make this a module so the global declaration doesn't pollute the global scope
export {};
