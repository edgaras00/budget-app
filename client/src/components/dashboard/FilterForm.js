import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ThemeContext } from "../../context/themeContext";

import { fetchAccountCategoryData } from "../../utils/utils";

import "./styles/transactionForm.css";
import "./styles/filterForm.css";

const FilterForm = ({ handleClose, setTransactions }) => {
  const { theme } = useContext(ThemeContext);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccountsAndCategories = async () => {
      const accountData = await fetchAccountCategoryData("account");
      const categoryData = await fetchAccountCategoryData("category");
      setAccounts(accountData.accounts);
      setCategories(categoryData.categories);
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

  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
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
    const url = "http://localhost:5000/api/transactions/user?" + query;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const responseData = await response.json();
    console.log(responseData);
    setTransactions(responseData.data.transactions);
    handleClose();
  };

  const accountOptions = accounts.map((account) => (
    <div key={account.id} className="checkbox">
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

  const categoryOptions = categories.map((category) => (
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
            <input type="number" {...register("amountMin")} />
          </div>
          <div className="filter-amount">
            <label>Maximum amount</label>
            <input type="number" {...register("amountMax")} />
          </div>
        </div>
        {/* <div className="input-wrapper">
          <label>Start date</label>
          <input type="date" {...register("startDate")} />
        </div>
        <div className="input-wrapper">
          <label>End date</label>
          <input type="date" {...register("endDate")} />
        </div> */}
        <div className="filter-accounts">
          <div className="option-heading">Accounts</div>
          <div className="account-options">{accountOptions}</div>
        </div>
        <div className="filter-accounts">
          <div className="option-heading">Categories</div>
          <div className="category-options">{categoryOptions}</div>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FilterForm;