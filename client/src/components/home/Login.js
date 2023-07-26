import LoginForm from "./LoginForm";
import useRedirect from "../../hooks/useRedirect";

import "./styles/login.css";

const Login = () => {
  useRedirect();
  return (
    <div className="login-container">
      <h1 className="login-heading">Log in</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
