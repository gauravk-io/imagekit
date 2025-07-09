// Import the IVideo interface from the Video model
import { IVideo } from "@/models/Video";

// Define the shape of the video data to send (excluding _id)
export type VideoFormData = Omit<IVideo, "_id">;

// Define the shape of fetch options used internally
type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"; // HTTP methods
    body?: any;                                 // Optional request body
    headers?: Record<string, string>;           // Optional headers
};

// ApiClient class to abstract API calls
class ApiClient {
    // Generic fetch method to call backend endpoints
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const { method = "GET", body, headers = {} } = options;

        const defaultHeaders = {
            "Content-Type": "application/json", // Default content type for JSON API
            ...headers,
        };

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined, // Only include body if it's present
        });

        if (!response.ok) {
            // Throw error with text response for better debugging
            throw new Error(await response.text());
        }

        // Return parsed JSON response
        return response.json();
    }

    // Public method to fetch all videos
    async getVideos() {
        return this.fetch("/videos");
    }

    // Public method to create a new video
    async createVideo(videoData: VideoFormData) {
        return this.fetch("/videos", {
            method: "POST",
            body: videoData,
        });
    }
}

// Export a singleton instance of the API client
export const apiClient = new ApiClient();
