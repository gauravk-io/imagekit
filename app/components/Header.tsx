"use client"; // Ensures the component runs on the client side (needed for hooks like useSession)

import Link from "next/link";
import { useSession, signOut } from "next-auth/react"; // For auth session and logout
import { Home, User } from "lucide-react"; // Icons
import { useNotification } from "./Notification"; // Custom notification hook

export default function Header() {
  const { data: session } = useSession(); // Fetch current session data
  const { showNotification } = useNotification(); // Show toast notifications

  // Handles user sign out and shows a notification based on result
  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    // Sticky navbar with base styling
    <div className="navbar bg-base-300 sticky top-0 z-40">
      <div className="container mx-auto">
        {/* Left section: app name with link to home */}
        <div className="flex-1 px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to ImageKit ReelsPro", "info")
            }
          >
            <Home className="w-5 h-5" />
            Video with AI
          </Link>
        </div>

        {/* Right section: user icon dropdown */}
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <User className="w-5 h-5" />
              </div>

              {/* Dropdown menu content */}
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
              >
                {session ? (
                  <>
                    {/* Display username/email prefix */}
                    <li className="px-4 py-1">
                      <span className="text-sm opacity-70">
                        {session.user?.email?.split("@")[0]}
                      </span>
                    </li>

                    <div className="divider my-1"></div>

                    {/* Link to upload page */}
                    <li>
                      <Link
                        href="/upload"
                        className="px-4 py-2 hover:bg-base-200 block w-full"
                        onClick={() =>
                          showNotification("Welcome to Admin Dashboard", "info")
                        }
                      >
                        Video Upload
                      </Link>
                    </li>

                    {/* Sign out button */}
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  // If not logged in, show login link
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                      onClick={() =>
                        showNotification("Please sign in to continue", "info")
                      }
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
