"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { setRequestOptions } from "../utils/utils";

import styles from "./transactionForm.module.css";

const BudgetForm = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await fetch("http://localhost:5000/api/category");
        const responseData = await response.json();

        setCategories(responseData.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const categoryOptions = categories.map((category) => {
    return <option key={category.id}>{category.name}</option>;
  });

  const schema = yup.object().shape({
    amount: yup
      .number()
      .required("Please enter budget amount")
      .positive("Amount value must be positive"),
    category: yup.string().required("Please select a category"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const token = localStorage.getItem("token");
    try {
      const selectedCategory = categories.find(
        (category) => category.name === data.category
      );

      if (!selectedCategory) return;

      const requestBody = {
        amount: data.amount,
        categoryId: selectedCategory.id,
      };

      const requestOptions = setRequestOptions("POST", requestBody, token);

      console.log(requestOptions);

      const response = await fetch(
        "http://localhost:5000/api/budget/",
        requestOptions
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Create Budget</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["input-wrapper"]}>
          <label>Category</label>
          <select {...register("category")}>
            <option>-- Select --</option>
            {categoryOptions}
          </select>
        </div>
        <div className={styles["input-wrapper"]}>
          <label>Amount</label>
          <input type="number" {...register("amount")} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BudgetForm;
