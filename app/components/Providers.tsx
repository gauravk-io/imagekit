// Import ImageKit provider for uploading and rendering images
import { ImageKitProvider } from "@imagekit/next";

// Import SessionProvider to manage NextAuth sessions globally
import { SessionProvider } from "next-auth/react";

// Get the ImageKit URL endpoint from environment variables
const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

// Define a wrapper component to provide global context to the app
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        // Provide authentication session context to the app
        <SessionProvider refetchInterval={5 * 60}> {/* Refetch session every 5 minutes */}

            {/* Provide ImageKit context for image uploading/rendering */}
            <ImageKitProvider urlEndpoint={urlEndPoint}>
                {children}
            </ImageKitProvider>

        </SessionProvider>
    );
}
