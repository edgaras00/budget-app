"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Pie, Cell, Legend, Tooltip } from "recharts";

const PieChart =
  (() => import("recharts").then((recharts) => recharts.PieChart),
  { ssr: false });

import BudgetType from "../BudgetType";
import styles from "./breakdown.module.css";

const data = [
  {
    name: "Category A",
    value: 200,
  },
  {
    name: "Category B",
    value: 300,
  },
  {
    name: "Category C",
    value: 100,
  },
];
const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const Breakdown = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/api/budget/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        console.log(responseData);

        setBudgets(responseData.data.budgets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBudgets();
  }, []);

  const budgetCards = budgets.map((budget) => (
    <BudgetType
      key={budget.id}
      id={budget.id}
      category={budget.category.name}
      amount={budget.amount}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles["breakdown-heading"]}>
        <h2>Spending breakdown</h2>
      </div>
      <div className={styles.bottom}>
        <div className={styles.budgets}>
          {budgetCards}
          {/* <BudgetType />
          <BudgetType />
          <BudgetType />
          <BudgetType />
          <BudgetType />
          <BudgetType /> */}
        </div>
        {/* <div className={styles.chart}>
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div> */}
      </div>
    </div>
  );
};

export default Breakdown;
