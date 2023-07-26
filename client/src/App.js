import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Home components
import Home from "./components/home/Home";
import Login from "./components/home/Login";
import Signup from "./components/home/Signup";
import Nav from "./components/home/Nav";

// Dashboard components
import Dashboard from "./components/dashboard/Dashboard";

// Accounts components
import Accounts from "./components/account/Accounts";

import { ThemeContext } from "./context/themeContext";

import "./App.css";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`app ${theme === "dark" ? "app-dark" : null}`}>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </div>
  );
}

export default App;
