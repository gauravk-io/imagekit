"use client"; // Tell Next.js to render this component entirely on the client side.

import VideoUploadForm from "../components/VideoUploadForm"; // Form that handles the actual file upload.

export default function VideoUploadPage() {
  return (
    // Center the page content and add padding.
    <div className="container mx-auto px-4 py-8">
      {/* Limit max width so it doesn’t stretch on large screens. */}
      <div className="max-w-2xl mx-auto">
        {/* Page heading. */}
        <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>

        {/* Reusable component that contains the upload logic and UI. */}
        <VideoUploadForm />
      </div>
    </div>
  );
}
