import { IKVideo } from "imagekitio-next"; // Video component from ImageKit
import Link from "next/link"; // Client-side navigation
import { IVideo } from "@/models/Video"; // Type definition for video object

// Displays a single video card with thumbnail, title, and description
export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      {/* Video preview with 9:16 aspect ratio */}
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.videoUrl} // ImageKit path (usually just the filename)
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls} // Show controls only if specified
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>

      {/* Title and description below video */}
      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}