import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { setRequestOptions } from "../../utils/utils";

import "./styles/signupForm.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email address")
      .email("Invalid email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password cannot be more than 30 characters"),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const requestOptions = setRequestOptions("POST", data, null);

      const response = await fetch(
        "http://localhost:5000/api/user/login",
        requestOptions
      );
      const responseData = await response.json();

      console.log(responseData);

      if ("user" in responseData.data) {
        const user = responseData.data.user;
        // setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
      // setToken(responseData.token);
      localStorage.setItem("token", responseData.token);

      navigate("/dashboard");

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <input
          {...register("email")}
          type="email"
          required
          placeholder="Email Address"
        />
        <input
          {...register("password")}
          type="password"
          required
          placeholder="Password"
        />
        <button type="submit">Log in</button>
        <p className="signup-account">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
