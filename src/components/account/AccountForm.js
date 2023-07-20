import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { setRequestOptions } from "../utils/utils";

import { RequestOptions, APIResponse, AccountRequestBody } from "../types/api";

import "./styles/accountForm.css";

const AccountForm = ({ modify, accountId, name, accountType, balance }) => {
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

  const { register, handleSubmit, reset } =
    useForm <
    AccountRequestBody >
    {
      resolver: yupResolver(schema),
      defaultValues: {
        name: modify ? name : "",
        accountType: modify ? accountType : "",
        balance: modify ? balance : 0,
      },
    };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    console.log(data);
    try {
      let requestBody = data;
      const requestOptions = setRequestOptions(
        modify ? "PATCH" : "POST",
        requestBody,
        token
      );

      console.log(requestOptions);

      const url = modify
        ? `http://localhost:5000/api/account/${accountId}`
        : "http://localhost:5000/api/account";
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      console.log(responseData);

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account-form-container">
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
        <button type="submit">{modify ? "Save" : "Add"} Account</button>
      </form>
    </div>
  );
};

export default AccountForm;
