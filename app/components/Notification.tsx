"use client"; // Enables client-side rendering in Next.js

import { createContext, useContext, useState, ReactNode } from "react";

// Define the types of notifications supported
type NotificationType = "success" | "error" | "warning" | "info";

// Define the shape of the context
interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

// Create the notification context
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// Provider component that wraps part of the app and enables toast notifications
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    id: number;
  } | null>(null);

  // Show a new notification and auto-clear it after 3 seconds
  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now(); // Use timestamp as a unique ID
    setNotification({ message, type, id });

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {/* Conditionally render the toast if a notification is active */}
      {notification && (
        <div className="toast toast-bottom toast-end z-[100]">
          <div className={`alert ${getAlertClass(notification.type)}`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

// Map notification types to DaisyUI alert classes
function getAlertClass(type: NotificationType): string {
  switch (type) {
    case "success":
      return "alert-success";
    case "error":
      return "alert-error";
    case "warning":
      return "alert-warning";
    case "info":
      return "alert-info";
    default:
      return "alert-info";
  }
}

// Hook for consuming the notification context
export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
