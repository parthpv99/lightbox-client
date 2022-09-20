import React, { useContext, useEffect, useState } from "react";

const MyProjectsContext = React.createContext();

export function useMyProjects() {
  return useContext(MyProjectsContext);
}

export function MyProjectsProvider({ children }) {
  const [myprojects, setMyProjects] = useState([]);

  return (
    <MyProjectsContext.Provider
      value={{
        myprojects,
        setMyProjects,
      }}
    >
      {children}
    </MyProjectsContext.Provider>
  );
}
