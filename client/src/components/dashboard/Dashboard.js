import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

import Activity from "./Activity";
import Analytics from "./Analytics";
import GoalsButton from "./GoalsButton";
import Breakdown from "./Breakdown";

import "./styles/dashboard.css";

import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  useAuth();

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`dashboard-container ${
        theme === "dark" ? "dashboard-dark" : null
      }`}
    >
      <div className="goals-btn-container">
        <GoalsButton text="Manage Accounts" type={2} link="/accounts" />
      </div>
      <Activity />
      <Breakdown />
      <Analytics />
    </div>
  );
};

export default Dashboard;
