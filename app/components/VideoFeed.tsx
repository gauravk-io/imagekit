import { IVideo } from "@/models/Video"; // Video type interface
import VideoComponent from "./VideoComponent"; // Reusable component for rendering individual videos

// Props type for the feed component
interface VideoFeedProps {
  videos: IVideo[];
}

// Displays a responsive grid of videos
export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    // Responsive grid layout: 1 to 4 columns depending on screen size
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Render each video in the grid */}
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}

      {/* Show message if there are no videos */}
      {videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
}