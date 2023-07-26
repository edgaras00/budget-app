import SignupForm from "./SignupForm";
import useRedirect from "../../hooks/useRedirect";
import "./styles/login.css";

const Signup = () => {
  useRedirect();
  return (
    <div className="login-container">
      <h1 className="login-heading">Create Your NextBudget Account</h1>
      <SignupForm />
    </div>
  );
};

export default Signup;
