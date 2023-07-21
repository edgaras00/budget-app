import { Link } from "react-router-dom";
import logo from "../../images/nblogo.svg";
import "./styles/nav.css";

const Nav = () => {
  const isLoggedIn = true;
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img
            className="logo"
            src={logo}
            alt="app logo"
            width={60}
            height={60}
          />
          <div className="app-name">NextBudget</div>
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="user-nav">
          <Link className="profile" to="/profile">
            Profile
          </Link>
          <div className="theme">Light</div>
          <div className="button-container user-button">
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
