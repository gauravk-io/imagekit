// Import required modules from mongoose and bcryptjs
import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

// TypeScript interface that defines the shape of a User document
export interface IUser {
    email: string;                     // User's email (must be unique)
    password: string;                  // User's hashed password
    _id?: mongoose.Types.ObjectId;     // Optional MongoDB document ID (auto-generated)
    createdAt?: Date;                  // Optional creation timestamp (added by Mongoose)
    updatedAt?: Date;                  // Optional update timestamp (added by Mongoose)
}

// Create a new Mongoose schema for the User model, using the IUser interface for type checking
const userSchema = new Schema<IUser>(
    {
        // Email field: must be a string, required, and unique across users
        email: { type: String, required: true, unique: true },

        // Password field: must be a string and is required
        password: { type: String, required: true }
    },
    {
        // This option tells Mongoose to automatically manage `createdAt` and `updatedAt` timestamps
        timestamps: true
    }
);

// Pre-save middleware (hook) that runs before a document is saved to the database
userSchema.pre('save', async function (next) {
    /**
     * `this` refers to the current user document being saved.
     * isModified('password') checks if the password field was changed (or is new).
     * If so, we hash the password before saving it to the database.
     * This prevents storing plain text passwords — a security best practice.
     */
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10); // Hash with saltRounds = 10
    }

    next(); // Proceed with saving
});


// Create (or reuse) the Mongoose model named "User"
// - `models.User`: checks if the model already exists (avoids re-defining in development/hot reload)
// - `model<IUser>("User", userSchema)`: creates the model with type safety using the IUser interface
const User = models.User || model<IUser>("User", userSchema);

// Export the model so it can be imported and used elsewhere (e.g., in API routes or services)
export default User;
