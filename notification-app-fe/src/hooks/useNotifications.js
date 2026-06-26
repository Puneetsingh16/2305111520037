import { useEffect, useState } from "react";
import { getNotifications } from "../api/notifications";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await getNotifications();

        console.log("API Response:", data);

        setNotifications(data.notifications || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
  };
}