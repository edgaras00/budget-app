import { useState, useEffect, useContext } from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ThemeContext } from "../../context/themeContext";

import { colors } from "../../utils/categoryColors";
import "./styles/analytics.css";

const Analytics = () => {
  const { theme } = useContext(ThemeContext);
  const [monthlySpending, setMonthlySpending] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMonthlySpending = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:5000/api/transactions/monthly",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const responseData = await response.json();
        setMonthlySpending(responseData.data.monthlyTransactions);
        setCategories(responseData.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMonthlySpending();
  }, []);

  const bars = categories.map((category) => (
    <Bar
      dataKey={category}
      fill={colors[category.toLowerCase()]}
      key={category}
    />
  ));

  return monthlySpending.length > 0 ? (
    <div
      className={`analytics-container ${
        theme === "dark" ? "analytics-container-dark" : null
      }`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={monthlySpending}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="test" />
          <XAxis dataKey="name" tick={{ stroke: "#fff" }} />
          <YAxis tick={{ stroke: "#fff" }} />
          <Tooltip />
          <Legend />
          {bars}
          {/* <Bar dataKey="Food" fill="#82ca9d" />
          <Bar dataKey="Groceries" fill="#8884d8" />
          <Bar dataKey="Household" fill="#82ca9d" />
          <Bar dataKey="Subscriptions" fill="#2C2CCA" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : null;
};

export default Analytics;
