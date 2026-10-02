import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const BASE_KEY = "denari:notifications";

const NotificationsContext = createContext({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAllRead: () => {},
});

export function NotificationsProvider({ children }) {
  const { currentUser, authLoading } = useAuth();
  const uid = currentUser?.uid;
  const [notifications, setNotifications] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!uid) {
      setNotifications([]);
      setLoaded(false);
      return;
    }
    try {
      const raw = localStorage.getItem(`${BASE_KEY}:${uid}`);
      setNotifications(raw ? JSON.parse(raw) : []);
    } catch {
      setNotifications([]);
    }
    setLoaded(true);
  }, [uid, authLoading]);

  useEffect(() => {
    if (!uid || !loaded) return;
    localStorage.setItem(`${BASE_KEY}:${uid}`, JSON.stringify(notifications));
  }, [notifications, uid, loaded]);

  const addNotification = ({ title, body, category = "Account", iconKey = "sparkles" }) => {
    setNotifications((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title,
        body,
        category,
        iconKey,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
  };

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, addNotification, markAllRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}