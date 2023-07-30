import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

import Activity from "./Activity";
import Analytics from "./Analytics";
import GoalsButton from "./GoalsButton";
import Breakdown from "./Breakdown";

import "./styles/dashboard.css";

import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  useAuth();
  const { theme } = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);
  const [spendingBreakdown, setSpendingBreakdown] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState([]);
  const [categories, setCategories] = useState([]);

  const [amountSort, setAmountSort] = useState("DESC");
  const [dateSort, setDateSort] = useState("ASC");
  const [categorySort, setCategorySort] = useState("ASC");
  const [accountSort, setAccountSort] = useState("ASC");

  const [formSubmitted, setFormSubmitted] = useState(0);

  const rerenderAfterSubmit = () => setFormSubmitted((submit) => submit + 1);

  const sortData = async (col, order) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/transactions/user?sort=${col}&order=${order}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const responseData = await response.json();
      setTransactions([...responseData.data.transactions]);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAmountSort = () => {
    const newAmountSort = amountSort === "ASC" ? "DESC" : "ASC";
    setAmountSort(newAmountSort);
    sortData("amount", newAmountSort);
  };

  const toggleDateSort = () => {
    const newDateSort = dateSort === "ASC" ? "DESC" : "ASC";
    setDateSort(newDateSort);
    sortData("date", newDateSort);
  };

  const toggleCategorySort = () => {
    const newCategorySort = categorySort === "ASC" ? "DESC" : "ASC";
    setCategorySort(newCategorySort);
    sortData("category", newCategorySort);
  };

  const toggleAccountSort = () => {
    const newAccountSort = accountSort === "ASC" ? "DESC" : "ASC";
    setAccountSort(newAccountSort);
    sortData("account", newAccountSort);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");

      try {
        if (!token) return;

        const response = await fetch("/api/transactions/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseData = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Auth error");
          }
          throw new Error("Something went wrong");
        }

        setTransactions(responseData.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, [formSubmitted]);

  useEffect(() => {
    const fetchSpendingBreakdown = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/transactions/breakdown", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();

        const spendingBreakdown = responseData.data.spendingBreakdown.map(
          (dataPoint) => {
            dataPoint.totalAmount = Number(dataPoint.totalAmount);
            return dataPoint;
          }
        );

        setSpendingBreakdown(spendingBreakdown);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpendingBreakdown();
  }, [transactions]);

  useEffect(() => {
    const fetchMonthlySpending = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("/api/transactions/monthly", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseData = await response.json();
        setMonthlySpending(responseData.data.monthlyTransactions);
        setCategories(responseData.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMonthlySpending();
  }, [transactions]);

  return (
    <div
      className={`dashboard-container ${
        theme === "dark" ? "dashboard-dark" : null
      }`}
    >
      <div className="goals-btn-container">
        <GoalsButton text="Manage Accounts" type={2} link="/accounts" />
      </div>
      <Activity
        transactions={transactions}
        setTransactions={setTransactions}
        rerenderAfterSubmit={rerenderAfterSubmit}
        toggleAmountSort={toggleAmountSort}
        toggleDateSort={toggleDateSort}
        toggleCategorySort={toggleCategorySort}
        toggleAccountSort={toggleAccountSort}
      />
      {transactions.length > 0 ? (
        <>
          <Breakdown spendingBreakdown={spendingBreakdown} />
          <Analytics
            monthlySpending={monthlySpending}
            categories={categories}
          />
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
