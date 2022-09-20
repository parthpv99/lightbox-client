import React, { useContext, useEffect, useState } from "react";
import { kBaseUrl } from "../constants";

const ProjectsContext = React.createContext();

export function useProjects() {
  return useContext(ProjectsContext);
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(kBaseUrl + "get_all_projects?page=1", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "Unauthenticated") setProjects(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
