import React, { useContext, useEffect, useState } from "react";
import { kBaseUrl } from "../constants";

const ProjectRequestContext = React.createContext();

export function useProjectRequests() {
  return useContext(ProjectRequestContext);
}

export function ProjectRequestProvider({ children }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(kBaseUrl + "project_requests", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ProjectRequestContext.Provider
      value={{
        requests,
        setRequests,
      }}
    >
      {children}
    </ProjectRequestContext.Provider>
  );
}
