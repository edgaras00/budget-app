import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";

import { ThemeContext } from "../../context/themeContext";

import { setRequestOptions, fetchAccountCategoryData } from "../../utils/utils";

import "./styles/transactionForm.css";

const TransactionForm = ({
  modify,
  id,
  name,
  date,
  account,
  category,
  rerenderAfterSubmit,
  handleClose,
  amount,
}) => {
  const { theme } = useContext(ThemeContext);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAccountsAndCategories = async () => {
      try {
        const accountData = await fetchAccountCategoryData("account");
        const categoryData = await fetchAccountCategoryData("category");

        setAccounts(accountData.accounts);
        setCategories(categoryData.categories);
      } catch (error) {
        console.log(error);
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
    return <option key={category.id}>{category.name}</option>;
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

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      transactionName: modify ? name : "",
      amount: modify ? amount : 0,
      transactionDate: modify ? date : "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    try {
      const selectedAccount = accounts.find(
        (account) => account.name === data.account.split("|")[0].trim()
      );

      const selectedCategory = categories.find(
        (category) => category.name === data.category
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

      const url = modify
        ? `http://localhost:5000/api/transactions/${id}`
        : "http://localhost:5000/api/transactions";
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      rerenderAfterSubmit();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`transaction-form-container ${
        theme === "dark" ? "transaction-form-container-dark" : null
      }`}
    >
      <div className="transaction-form-heading">
        <h1>Add Transaction</h1>
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
          <input type="number" {...register("amount")} />
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
        {accounts.length === 0 ? (
          <div>
            Please <Link to="/accounts">add an account</Link> before submitting
            a transaction
          </div>
        ) : (
          <button type="submit">Save</button>
        )}
      </form>
    </div>
  );
};

export default TransactionForm;