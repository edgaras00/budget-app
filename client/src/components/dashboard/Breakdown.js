// import { useState, useEffect } from "react";
import { Pie, Cell, Legend, Tooltip, PieChart } from "recharts";

import { colors } from "../../utils/categoryColors";

import "./styles/breakdown.css";

// const colors = ["#8884d8", "#82ca9d", "#ffc658"];

const Breakdown = ({ spendingBreakdown }) => {
  return (
    <div className="breakdown-container">
      <div className="breakdown-heading">
        <h2>Spending breakdown</h2>
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
