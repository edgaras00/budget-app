import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ThemeContext } from "../../context/themeContext";

import { setRequestOptions } from "../../utils/utils";

import "./styles/authForm.css";

const SignupForm = () => {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const [signupError, setSignupError] = useState("");

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter your name")
      .max(30, "Name cannot exceed more than 30 characters."),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Invalid email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password cannot be more than 30 characters"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const requestOptions = setRequestOptions(
        "POST",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        null
      );

      let url = "https://nextbudget-server.onrender.com/api/user/signup";
      if (process.env.REACT_APP_ENV === "development") {
        url = "/api/user/signup";
      }
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (response.status !== 201) {
        throw new Error(responseData.message);
      }

      console.log(responseData);

      localStorage.setItem("token", responseData.token);
      navigate("/dashboard");

      reset();
    } catch (error) {
      console.log(error);
      if (error.message === "email must be unique") {
        setSignupError("User with this email already exists");
      }
      return;
    }
  };

  return (
    <div className="signup-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`signup-form ${
          theme === "dark" ? "signup-form-dark" : null
        }`}
      >
        <input {...register("name")} type="text" required placeholder="Name" />
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
        <input
          {...register("confirmPassword")}
          type="password"
          required
          placeholder="Confirm Password"
        />
        <div
          className={`form-errors ${
            theme === "dark" ? "form-errors-dark" : null
          }`}
        >
          {errors.name && <p>{errors.name.message}</p>}
          {errors.email && <p>{errors.email.message}</p>}
          {errors.password && <p>{errors.password.message}</p>}
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          {signupError}
        </div>
        <button type="submit">Sign up</button>
        <p className="signup-account">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
