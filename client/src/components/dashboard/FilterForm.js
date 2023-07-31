import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ThemeContext } from "../../context/themeContext";

import "./styles/transactionForm.css";
import "./styles/filterForm.css";

const FilterForm = ({
  handleClose,
  setTransactions,
  transactionCategories,
}) => {
  const { theme } = useContext(ThemeContext);
  const [accounts, setAccounts] = useState([]);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchAccountsAndCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        let url = "https://nextbudget-server.onrender.com/api/account/user";
        if (process.env.REACT_APP_ENV) {
          url = "/api/account/user";
        }
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Could not get account data");
        }

        const responseData = await response.json();
        setAccounts(responseData.data.accounts);
      } catch (error) {
        console.log(error);
        setServerError(error.message);
        return;
      }
    };
    fetchAccountsAndCategories();
  }, []);

  const numberField = yup.number().positive("Value must be positive");

  const schema = yup.object().shape({
    amountMin: yup.lazy((value) =>
      value !== undefined && value !== ""
        ? numberField
        : yup.mixed().notRequired()
    ),
    amountMax: yup.lazy((value) =>
      value !== undefined && value !== ""
        ? numberField
        : yup.mixed().notRequired()
    ),
    startDate: yup.lazy((value) =>
      value !== undefined && value !== ""
        ? yup.date()
        : yup.mixed().notRequired()
    ),
    endDate: yup.lazy((value) =>
      value !== undefined && value !== ""
        ? yup.date()
        : yup.mixed().notRequired()
    ),
    categoryOptions: yup.array().of(yup.string()),
    accountOptions: yup.array().of(yup.string()),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    try {
      const selectedCategories = data.categoryOptions || [];
      const selectedAccounts = data.accountOptions || [];

      const formData = {
        amountMin: data.amountMin || "",
        amountMax: data.amountMax || "",
        categoryOptions: selectedCategories,
        accountOptions: selectedAccounts,
      };

      if (!data.categoryOptions) {
        formData.categoryOptions = [];
      }

      if (!data.accountOptions) {
        formData.accountOptions = [];
      }

      let query = "";
      for (let key in formData) {
        if (formData[key] && formData[key].length !== 0) {
          query += `${key}=${formData[key]}&`;
        }
      }

      let url = `https://nextbudget-server.onrender.com/api/transactions/user?${query}`;
      if (process.env.REACT_APP_ENV === "development") {
        url = `/api/transactions/user?${query}`;
      }

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      const responseData = await response.json();
      console.log(responseData);
      setTransactions(responseData.data.transactions);
      handleClose();
    } catch (error) {
      console.log(error);
      setServerError(error.message);
      return;
    }
  };

  const accountOptions = accounts.map((account) => (
    <div key={account.id} className="checkbox account-check">
      <label>
        {account.name} ({account.accountType})
      </label>
      <Controller
        name="accountOptions"
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            value={account.id}
            checked={
              Array.isArray(field.value) && field.value.includes(account.id)
            }
            onChange={(e) => {
              const accountId = account.id;
              const isChecked = e.target.checked;
              if (isChecked) {
                field.onChange([...(field.value || []), accountId]);
              } else {
                field.onChange(
                  (field.value || []).filter((id) => id !== accountId)
                );
              }
            }}
          />
        )}
      />
    </div>
  ));

  const categoryOptions = transactionCategories.map((category) => (
    <div key={category.id} className="checkbox category-check">
      <label>{category.name}</label>
      <Controller
        name="categoryOptions"
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            value={category.id}
            checked={
              Array.isArray(field.value) && field.value.includes(category.id)
            }
            onChange={(e) => {
              const categoryId = category.id;
              const isChecked = e.target.checked;
              if (isChecked) {
                field.onChange([...(field.value || []), categoryId]);
              } else {
                field.onChange(
                  (field.value || []).filter((id) => id !== categoryId)
                );
              }
            }}
          />
        )}
      />
    </div>
  ));

  return (
    <div
      className={`transaction-form-container ${
        theme === "dark" ? "transaction-form-container-dark" : null
      }`}
    >
      <div className="transaction-form-heading">
        <h1>Filter Transactions</h1>
      </div>
      <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="amounts">
          <div className="filter-amount">
            <label>Minimum amount</label>
            <input type="number" {...register("amountMin")} step="0.01" />
          </div>
          <div className="filter-amount">
            <label>Maximum amount</label>
            <input type="number" {...register("amountMax")} step="0.01" />
          </div>
        </div>
        <div className="filter-accounts">
          <div className="option-heading">Accounts</div>
          <div className="filter-options">{accountOptions}</div>
        </div>
        <div className="filter-accounts">
          <div className="option-heading">Categories</div>
          <div className="filter-options">{categoryOptions}</div>
        </div>
        <div
          className={`form-errors ${
            theme === "dark" ? "form-errors-dark" : null
          }`}
        >
          {errors.amountMin && <p>{errors.amountMin.message}</p>}
          {errors.amountMax && <p>{errors.amountMax.message}</p>}
          {errors.categoryOptions && <p>{errors.categoryOptions.message}</p>}
          {errors.accountOptions && <p>{errors.accountOptions.message}</p>}
          {serverError}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FilterForm;
