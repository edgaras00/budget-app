import { useContext } from "react";

import {
  BarChart,
  Bar,
  // Cell,
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
  const { theme } = useContext(ThemeContext);

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
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : null;
};

export default Analytics;
