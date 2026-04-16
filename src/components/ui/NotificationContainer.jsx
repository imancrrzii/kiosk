import React from "react";
import Notification from "./Notification";

export default function NotificationContainer({ notifications, onClose }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3 max-w-md">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          title={notification.title}
          message={notification.message}
          variant={notification.variant}
          showClose={true}
          onClose={() => onClose(notification.id)}
        />
      ))}
    </div>
  );
}