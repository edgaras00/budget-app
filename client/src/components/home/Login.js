import { useContext } from "react";
import LoginForm from "./LoginForm";

import { ThemeContext } from "../../context/themeContext";

import useRedirect from "../../hooks/useRedirect";

import "./styles/login.css";

const Login = () => {
  useRedirect();
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`login-container ${
        theme === "dark" ? "login-container-dark" : null
      }`}
    >
      <h1 className="login-heading">Log in</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
