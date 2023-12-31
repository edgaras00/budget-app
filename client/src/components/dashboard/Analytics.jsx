import { useContext } from "react";

import {
  BarChart,
  Bar,
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

const Analytics = ({ monthlySpending, categories }) => {
  console.log(monthlySpending);
  const { theme } = useContext(ThemeContext);

  const bars = categories.map((category) => (
    <Bar
      dataKey={category}
      fill={colors[category.toLowerCase()]}
      key={category}
    />
  ));

  return (
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
          <XAxis
            dataKey="name"
            tick={{ stroke: theme === "dark" ? "#fff" : "#797979" }}
          />
          <YAxis tick={{ stroke: theme === "dark" ? "#fff" : "#797979" }} />
          <Tooltip />
          <Legend />
          {bars}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
