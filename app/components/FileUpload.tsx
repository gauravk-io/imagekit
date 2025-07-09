"use client"; // This component must be a client component

// Import required utilities and error types from ImageKit Next SDK
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";

import { useRef, useState } from "react";

// Define props for the FileUpload component
interface FileUploadProps {
    onSuccess: (res: any) => void;         // Callback on successful upload
    onProgress?: (progress: number) => void; // Optional callback for upload progress
    fileType?: "image" | "video";          // Restrict file type
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
    const [uploading, setUploading] = useState(false); // Upload status
    const [error, setError] = useState<string | null>(null); // Upload error (if any)

    // Optional client-side file validation before uploading
    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload a valid video file");
            }
        }

        // Restrict file size to 100MB
        if (file.size > 100 * 1024 * 1024) {
            setError("File size must be less than 100 MB");
        }

        return true;
    };

    // Handle file selection and uploading
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) return;

        setUploading(true);
        setError(null);

        try {
            // Fetch upload authentication credentials from your API
            const authRes = await fetch("/api/auth/imagekit-auth");
            const auth = await authRes.json();

            // Upload the file using ImageKit's upload function
            const res = await upload({
                file,
                fileName: file.name,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                signature: auth.signature,
                expire: auth.expire,
                token: auth.token,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent)); // Call onProgress with percentage
                    }
                },
            });

            onSuccess(res); // Notify parent component of successful upload
        } catch (error) {
            console.error("Upload failed", error); // Handle upload failure
        } finally {
            setUploading(false); // Reset uploading state
        }
    };

    return (
        <>
            {/* File input with conditional accept type */}
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileChange}
            />
            {/* Optional loading indicator */}
            {uploading && <span>Loading....</span>}
        </>
    );
};

export default FileUpload;
