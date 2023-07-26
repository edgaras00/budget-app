"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { setRequestOptions } from "../utils/utils";

import styles from "./goalForm.module.css";

const GoalForm = () => {
  const numberField = yup.number().positive("Value must be non-negative");
  const schema = yup.object().shape({
    goalName: yup
      .string()
      .required("Please enter a name for your budget")
      .max(50, "Budget name cannot exceed more than 50 characters"),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    subscriptions: numberField,
    household: numberField,
    groceries: numberField,
    utilities: numberField,
    savings: numberField,
    income: numberField,
    transportation: numberField,
    healthcare: numberField,
    education: numberField,
    charity: numberField,
    clothing: numberField,
    foodAndDrink: numberField,
    entertainment: numberField,
    misc: numberField,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //   Specify schema
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    try {
      const requestOptions = setRequestOptions("POST", data, token);
      const response = await fetch(
        "http://localhost:5000/api/budget",
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
      <form className={styles["goal-form"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.top}>
          <div className={styles.name}>
            <label>Name</label>
            <input type="text" {...register("goalName")} />
          </div>
          <div className={styles.dates}>
            <div>
              <label>Start Date</label>
              <input type="date" {...register("startDate")} />
            </div>
            <div>
              <label>End Date</label>
              <input type="date" {...register("endDate")} />
            </div>
          </div>
        </div>
        <div className={styles.categories}>
          <div className={styles["category-heading"]}>Budgets by Category</div>
          <div className={styles.group}>
            <div>
              <label>Subscriptions</label>
              <input type="number" {...register("subscriptions")} />
            </div>
            <div>
              <label>Household</label>
              <input type="number" {...register("household")} />
            </div>
          </div>
          <div className={styles.group}>
            <div>
              <label>Groceries</label>
              <input type="number" {...register("groceries")} />
            </div>
            <div>
              <label>Utilities</label>
              <input type="number" {...register("utilities")} />
            </div>
          </div>
          <div className={styles.group}>
            <div>
              <label>Savings</label>
              <input type="number" {...register("savings")} />
            </div>
            <div>
              <label>Income</label>
              <input type="number" {...register("income")} />
            </div>
          </div>
          <div className={styles.group}>
            <div>
              <label>Transportation</label>
              <input type="number" {...register("transportation")} />
            </div>
            <div>
              <label>Healthcare</label>
              <input type="number" {...register("healthcare")} />
            </div>
          </div>
          <div className={styles.group}>
            <div>
              <label>Education</label>
              <input type="number" {...register("education")} />
            </div>
            <div>
              <label>Charity</label>
              <input type="number" {...register("charity")} />
            </div>
          </div>
          <div className={styles.group}>
            <div>
              <label>Clothing</label>
              <input type="number" {...register("clothing")} />
            </div>
            <div>
              <label>Food and Drink</label>
              <input type="number" {...register("foodAndDrink")} />
            </div>
          </div>
          <div className={styles.group}>
            <div>
              <label>Entertainment</label>
              <input type="number" {...register("entertainment")} />
            </div>
            <div>
              <label>Misc</label>
              <input type="number" {...register("misc")} />
            </div>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default GoalForm;
