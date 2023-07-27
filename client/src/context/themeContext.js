import { useState, createContext } from "react";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    // setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    setTheme((prevTheme) => {
      const theme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", theme);
      return theme;
    });
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };
