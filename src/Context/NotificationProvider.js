import React, { useContext, useEffect, useState } from "react";
import { kBaseUrl } from "../constants";

const NotificationContext = React.createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    fetch(kBaseUrl + "fetch_notifications", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        setNotifications(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        notifCount,
        setNotifCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
