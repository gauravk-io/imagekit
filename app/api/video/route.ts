// Import authentication options for verifying sessions
import { authOptions } from "@/lib/auth";

// Import the function to connect to the MongoDB database
import { connectToDatabase } from "@/lib/db";

// Import the Video model and its TypeScript interface
import Video, { IVideo } from "@/models/Video";

// Import function to retrieve the server session
import { getServerSession } from "next-auth";

// Import Next.js request and response helpers
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests to fetch all videos
export async function GET() {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();

    // Fetch all videos sorted by most recent first
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    // If no videos found, return empty array
    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Return the list of videos
    return NextResponse.json(videos);
  } catch (error) {
    // Return error if fetching fails
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

// Handle POST requests to upload a new video
export async function POST(request: NextRequest) {
  try {
    // Check if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the MongoDB database
    await connectToDatabase();

    // Parse request body into a video object
    const body: IVideo = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare video data with optional controls and transformation defaults
    const videoData = {
      ...body,
      controls: body?.controls ?? true, // Default to true if not provided
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100, // Default to 100
      },
    };

    // Save the new video to the database
    const newVideo = await Video.create(videoData);

    // Return the created video
    return NextResponse.json(newVideo);
  } catch (error) {
    // Return error if creation fails
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
