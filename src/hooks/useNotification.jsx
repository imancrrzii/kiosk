import { useState, useCallback } from "react";

export function useNotification() {
  const [notifications, setNotifications] = useState([]);

  const show = useCallback((message, variant = "info", duration = 3000) => {
    const id = Date.now();
    const notification = {
      id,
      title: variant === "success" ? "Berhasil" : variant === "error" ? "Error" : "Informasi",
      message,
      variant,
    };

    setNotifications((prev) => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const hide = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const hideAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    show,
    hide,
    hideAll,
  };
}