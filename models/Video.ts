// Import required modules from mongoose
import mongoose, { Schema, model, models } from "mongoose";

// Constant for default video dimensions (used in transformation settings)
// `as const` ensures values are treated as literals (not just number type)
export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920
} as const;

// TypeScript interface defining the structure of a Video document
export interface IVideo {
    _id?: mongoose.Types.ObjectId;      // Optional MongoDB document ID
    title: string;                      // Video title
    description: string;                // Video description
    videoUrl: string;                   // URL to the actual video file
    thumbnailUrl: string;               // URL to the video thumbnail image
    controls?: boolean;                 // Whether playback controls are shown
    transformation?: {                  // Optional transformation config for display
        height: number;                 // Display height
        width: number;                  // Display width
        quality?: number;              // Optional quality value (1–100)
    };
}

// Define the Mongoose schema for the Video model
const videoSchema = new Schema<IVideo>(
    {
        title: { type: String, required: true },            // Title is required
        description: { type: String, required: true },      // Description is required
        videoUrl: { type: String, required: true },         // Video URL is required
        thumbnailUrl: { type: String, required: true },     // Thumbnail URL is required
        controls: { type: Boolean, default: true },         // Controls are shown by default
        transformation: {
            height: { type: Number, default: VIDEO_DIMENSIONS.height }, // Default height
            width: { type: Number, default: VIDEO_DIMENSIONS.width },   // Default width
            quality: { type: Number, min: 1, max: 100 },                 // Optional quality (1–100)
        },
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Mongoose model
// If the model already exists (e.g., during hot reload in dev), reuse it
const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;