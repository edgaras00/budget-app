import { useContext } from "react";
import SignupForm from "./SignupForm";

import { ThemeContext } from "../../context/themeContext";

import useRedirect from "../../hooks/useRedirect";
import "./styles/login.css";

const Signup = () => {
  useRedirect();
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`login-container ${
        theme === "dark" ? "login-container-dark" : null
      }`}
    >
      <h1 className="login-heading">Create Your NextBudget Account</h1>
      <SignupForm />
    </div>
  );
};

export default Signup;
