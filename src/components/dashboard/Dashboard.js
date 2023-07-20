import Activity from "./Activity";
// import Breakdown from "./Breakdown";
import Analytics from "./Analytics";
import GoalsButton from "./GoalsButton";
import "./styles/dashboard.css";

import useAuth from "../../hooks/useAuth";

// import useAuthentication from "../../hooks/useAuthentication";
// import withAuth from "../../hooks/withAuth";

const Dashboard = () => {
  //   useAuthentication();
  useAuth();
  return (
    <div className="dashboard-container">
      <div className="goals-btn-container">
        <GoalsButton text="Manage Accounts" type={2} link="/accounts" />
      </div>
      <Activity />
      {/* <Breakdown /> */}
      {/* <Analytics /> */}
    </div>
  );
};

export default Dashboard;
