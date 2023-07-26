import { Link } from "react-router-dom";

import "./styles/goalsButton.css";

const GoalsButton = ({ text, link }) => {
  return (
    <Link to={link} className="set-goals">
      <div>{text}</div>
    </Link>
  );
};

export default GoalsButton;
