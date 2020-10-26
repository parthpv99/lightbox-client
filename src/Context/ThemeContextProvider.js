import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeContextProvider = ({ children }) => {
  const [defaultTheme, setDefaultTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ defaultTheme, setDefaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
