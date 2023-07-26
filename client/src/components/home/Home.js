import { useContext } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../context/themeContext";

import useRedirect from "../../hooks/useRedirect";

import "./styles/home.css";

const Home = () => {
  useRedirect();

  const { theme } = useContext(ThemeContext);

  return (
    <main className="home">
      <div className="home-top">
        <div className="home-heading">
          <h1>
            <span
              className={`${
                theme === "dark" ? "heading-track-dark" : "heading-track"
              }`}
            >
              TRACK.
            </span>{" "}
            <span
              className={`${
                theme === "dark" ? "heading-plan-dark" : "heading-plan"
              }`}
            >
              PLAN.
            </span>{" "}
            <span
              className={`${
                theme === "dark" ? "heading-succeed-dark" : "heading-succeed"
              }`}
            >
              SUCCEED.
            </span>
          </h1>
        </div>
        <div
          className={`home-description ${
            theme === "dark" ? "home-description-dark" : null
          }`}
        >
          <p>
            Take control of your finances effortlessly with our intuitive
            budgeting app, empowering financial stability and goal achievement.
          </p>
        </div>
      </div>
      <div
        className={`home-start ${theme === "dark" ? "home-start-dark" : null}`}
      >
        <Link to="/signup">
          <button>Get Started</button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
