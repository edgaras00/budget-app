import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ThemeContext } from "../../context/themeContext";

import { setRequestOptions } from "../../utils/utils";

import "./styles/accountForm.css";

const AccountForm = ({
  modify,
  accountId,
  name,
  accountType,
  balance,
  handleClose,
  rerenderAfterSubmit,
}) => {
  const { theme } = useContext(ThemeContext);

  const [serverError, setServerError] = useState("");

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter account name")
      .max(30, "Account name cannot exceed more than 30 characters"),
    accountType: yup
      .string()
      .required("Please enter account type")
      .max(30, "Account type cannot exceed more than 30 characters"),
    balance: yup.number().required("Please enter your balance"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: modify ? name : "",
      accountType: modify ? accountType : "",
      balance: modify ? balance : 0,
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      let requestBody = data;
      const requestOptions = setRequestOptions(
        modify ? "PATCH" : "POST",
        requestBody,
        token
      );

      const url = modify ? `/api/account/${accountId}` : "/api/account";
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }
      alert("Hello");
      rerenderAfterSubmit();
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      setServerError(error.message);
      return;
    }
  };

  return (
    <div
      className={`account-form-container ${
        theme === "dark" ? "account-form-container-dark" : null
      }`}
    >
      <div className="account-form-heading">
        <h1>{modify ? "Modify" : "Add"} Account</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="account-form">
        <div className="input-wrapper">
          <label>Account name</label>
          <input {...register("name")} type="text" />
        </div>
        <div className="input-wrapper">
          <label>Account type</label>
          <input {...register("accountType")} type="text" />
        </div>
        <div className="input-wrapper">
          <label>Balance</label>
          <input {...register("balance")} type="number" />
        </div>
        <div
          className={`form-errors ${
            theme === "dark" ? "form-errors-dark" : null
          }`}
        >
          {errors.name && <p>{errors.name.message}</p>}
          {errors.accountType && <p>{errors.accountType.message}</p>}
          {errors.balance && <p>{errors.balance.message}</p>}
          {serverError}
        </div>
        <button type="submit">{modify ? "Save" : "Add"} Account</button>
      </form>
    </div>
  );
};

export default AccountForm;
