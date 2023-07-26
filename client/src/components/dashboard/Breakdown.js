import { useContext } from "react";
import { Pie, Cell, Legend, Tooltip, PieChart } from "recharts";

import { ThemeContext, ThemeContextProvider } from "../../context/themeContext";

import { colors } from "../../utils/categoryColors";

import "./styles/breakdown.css";

const Breakdown = ({ spendingBreakdown }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="breakdown-container">
      <div
        className={`breakdown-heading ${
          theme === "dark" ? "breakdown-heading-dark" : null
        }`}
      >
        <h2>Spending Breakdown</h2>
      </div>
      <div className="breakdown-bottom">
        <div className="breakdown-chart">
          <PieChart width={400} height={300}>
            <Pie
              data={spendingBreakdown}
              dataKey="totalAmount"
              nameKey="categoryName"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {spendingBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.categoryName]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
