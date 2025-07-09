// Import ImageKit helper to generate upload authentication parameters
import { getUploadAuthParams } from "@imagekit/next/server";

// Define a GET API handler to provide ImageKit upload auth parameters
export async function GET() {
  try {
    // Generate authentication parameters using private and public keys
    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Secret server-side key
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string, // Public key for client use
    });

    // Return auth parameters and public key to the client
    return Response.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    });
  } catch (error) {
    // Handle and return error if ImageKit auth generation fails
    return Response.json(
      {
        error: "Authentication for Imagekit failed",
      },
      { status: 500 }
    );
  }
}
