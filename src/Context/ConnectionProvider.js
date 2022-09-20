import React, { useContext, useEffect, useState } from "react";
import { kBaseUrl } from "../constants";

const ConnectionContext = React.createContext();

export function useConnections() {
  return useContext(ConnectionContext);
}

export function ConnectionProvider({ children }) {
  const [connections, setConnections] = useState([]);
  const [invites, setInvites] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(kBaseUrl + "myconnections", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setConnections(data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    fetch(kBaseUrl + "request_received", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setInvites(data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    fetch(kBaseUrl + "suggest_connection", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setSuggestions(data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        setConnections,
        invites,
        setInvites,
        suggestions,
        setSuggestions,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}
