import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

// Home components
import Home from "./components/home/Home";
import UserForms from "./components/home/UserForms";
import LoginForm from "./components/home/LoginForm";
import SignupForm from "./components/home/SignupForm";
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
        <Route
          path="/signup"
          element={
            <UserForms
              form={<SignupForm />}
              heading="Create Your NextBudget Account"
            />
          }
        />
        <Route
          path="/login"
          element={<UserForms form={<LoginForm />} heading="Log in" />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </div>
  );
}

export default App;
