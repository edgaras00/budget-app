import { useContext } from "react";

import { ThemeContext } from "../../context/themeContext";

import useRedirect from "../../hooks/useRedirect";
import "./styles/userForms.css";

const UserForms = ({ form, heading }) => {
  useRedirect();
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`login-container ${
        theme === "dark" ? "login-container-dark" : null
      }`}
    >
      <h1 className="login-heading">{heading}</h1>
      {form}
    </div>
  );
};

export default UserForms;
