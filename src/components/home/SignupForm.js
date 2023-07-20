// import { useContext } from "react";
// import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import { AuthContext } from "../context/AuthContext";

import { setRequestOptions } from "../../utils/utils";

import "./styles/signupForm.css";

const SignupForm = () => {
  // const { setUser, setToken } = useContext(AuthContext);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter your name")
      .max(30, "Cannot exceed more than 30 characters."),
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

  const { register, handleSubmit, reset } = useForm({
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
      console.log(requestOptions);
      const response = await fetch(
        "http://localhost:5000/api/user/signup",
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

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
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
        <button type="submit">Sign up</button>
        <p className="signup-account">
          Already have an account?{" "}
          {/* <Link href="/login" className={styles.link}>
            Log in
          </Link> */}
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
