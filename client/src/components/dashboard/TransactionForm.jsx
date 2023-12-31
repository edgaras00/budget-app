import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";

import { ThemeContext } from "../../context/themeContext";

import { setRequestOptions, capitalize } from "../../utils/utils";

import "./styles/transactionForm.css";

const TransactionForm = ({
  modify,
  id,
  name,
  date,

  rerenderAfterSubmit,
  handleClose,
  amount,
  mobile,
  removeTransaction,
}) => {
  const { theme } = useContext(ThemeContext);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchAccountsAndCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        let accountUrl =
          "https://nextbudget-server.onrender.com/api/account/user";
        if (import.meta.env.REACT_APP_ENV === "development") {
          accountUrl = "/api/account/user";
        }

        const accountResponse = await fetch(accountUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let categoryUrl = "https://nextbudget-server.onrender.com/api/category";
        if (import.meta.env.REACT_APP_ENV === "development") {
          categoryUrl = "/api/category";
        }
        const categoryResponse = await fetch(categoryUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!accountResponse.ok) {
          throw new Error("account error");
        }
        if (!categoryResponse.ok) {
          throw new Error("category error");
        }

        const accountData = await accountResponse.json();
        const categoryData = await categoryResponse.json();

        setAccounts(accountData.data.accounts);
        setCategories(categoryData.data.categories);
      } catch (error) {
        console.log(error);
        if (error.message === "account error") {
          setServerError("Could not get account data");
          return;
        }
        if (error.message === "category error") {
          setServerError("Could not get category data");
          return;
        }
      }
    };
    fetchAccountsAndCategories();
  }, []);

  const accountOptions = accounts.map((account) => {
    return (
      <option
        key={account.id}
      >{`${account.name} | ${account.accountType}`}</option>
    );
  });

  const categoryOptions = categories.map((category) => {
    return <option key={category.id}>{capitalize(category.name)}</option>;
  });

  const numberField = yup
    .number()
    .required("Please enter transaction amount")
    .positive("Value must be positive");

  const schema = yup.object().shape({
    transactionName: yup
      .string()
      .required("Please enter a name describing your transaction")
      .max(50, "Cannot exceed more than 50 characters"),
    transactionDate: yup.date().required("Please enter transaction date"),
    amount: numberField,
    category: yup.string().required("Please select a category"),
    account: yup.string().required("Please select transaction account / type"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      transactionName: modify ? name : "",
      amount: modify ? amount : 0,
      transactionDate: modify ? date : "",
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const selectedAccount = accounts.find((account) => {
        const nameAndType = data.account.split("|");
        const accountName = nameAndType[0].trim();
        const accountType = nameAndType[1].trim();
        return (
          account.name === accountName && account.accountType === accountType
        );
      });

      const selectedCategory = categories.find(
        (category) => category.name === data.category.toLowerCase()
      );

      if (!selectedAccount || !selectedCategory) return;

      const requestBody = {
        name: data.transactionName,
        amount: data.amount,
        date: dayjs(data.transactionDate).format("YYYY-MM-DD"),
        categoryId: selectedCategory.id,
        accountId: selectedAccount.id,
      };

      const requestOptions = setRequestOptions(
        modify ? "PATCH" : "POST",
        requestBody,
        token
      );

      let url = `https://nextbudget-server.onrender.com/api/transactions/${
        modify ? id : ""
      }`;
      if (import.meta.env.REACT_APP_ENV === "development") {
        url = `/api/transactions/${modify ? id : ""}`;
      }
      console.log(url);
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      rerenderAfterSubmit();
      handleClose();
    } catch (error) {
      console.log(error);
      setServerError(error.message);
      return;
    }
  };

  return (
    <div
      className={`transaction-form-container ${
        theme === "dark" ? "transaction-form-container-dark" : null
      }`}
    >
      <div className="transaction-form-heading">
        <h1>{modify ? "Edit" : "Add"} Transaction</h1>
      </div>
      <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label>Transaction name</label>
          <input type="text" {...register("transactionName")} />
        </div>
        <div className="input-wrapper">
          <label>Date</label>
          <input type="date" {...register("transactionDate")} />
        </div>
        <div className="input-wrapper">
          <label>Amount</label>
          <input type="number" {...register("amount")} step="0.01" />
        </div>
        <div className="input-wrapper">
          <label>Category</label>
          <select {...register("category")}>
            <option>-- Select --</option>
            {categoryOptions}
          </select>
        </div>
        <div className="input-wrapper">
          <label>Account / Type</label>
          {/* <input type="text" {...register("account")} /> */}
          <select {...register("account")}>
            <option>-- Select --</option>
            {accountOptions}
          </select>
        </div>
        <div
          className={`form-errors ${
            theme === "dark" ? "form-errors-dark" : null
          }`}
        >
          {errors.transactionName && <p>{errors.transactionName.message}</p>}
          {errors.transactionDate && <p>{errors.transactionDate.message}</p>}
          {errors.amount && <p>{errors.amount.message}</p>}
          {errors.category && <p>{errors.category.message}</p>}
          {errors.account && <p>{errors.account.message}</p>}
          {serverError}
        </div>
        {accounts.length === 0 ? (
          <div>
            Please <Link to="/accounts">add an account</Link> before submitting
            a transaction
          </div>
        ) : (
          <button type="submit">Save</button>
        )}
      </form>
      {mobile ? (
        <div className="remove-txn-container">
          <button className="remove-txn" onClick={removeTransaction}>
            Remove
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TransactionForm;
