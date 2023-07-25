import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import logo from "../../images/nblogo.svg";
import "./styles/nav.css";

const Nav = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const token = localStorage.getItem("token");

  return (
    <nav className={`navbar ${theme === "dark" ? "nav-dark" : null}`}>
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img
            className="logo"
            src={logo}
            alt="app logo"
            width={60}
            height={60}
          />
          <div
            className={`app-name ${theme === "dark" ? "app-name-dark" : null}`}
          >
            NextBudget
          </div>
        </Link>
      </div>
      {token ? (
        <div className={`user-nav`}>
          <div
            className={`theme ${theme === "dark" ? "theme-dark" : null}`}
            onClick={toggleTheme}
          >
            {theme === "light" ? "Dark" : "Light"}
          </div>
          <div
            className={`button-container user-button ${
              theme === "dark" ? "button-container-dark" : null
            }`}
          >
            <button>Log Out</button>
          </div>
        </div>
      ) : (
        <div className="button-container">
          <button>Log In</button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
