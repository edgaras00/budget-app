import LoginForm from "./components/LoginForm";

import "./styles/login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h1 className="login-heading">Log in</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
