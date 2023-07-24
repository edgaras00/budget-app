import { useState, useEffect } from "react";
import { Pie, Cell, Legend, Tooltip, PieChart } from "recharts";

// import styles from "./breakdown.module.css";

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
  const [spendingBreakdown, setSpendingBreakdown] = useState([]);

  useEffect(() => {
    const fetchSpendingBreakdown = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/transactions/breakdown",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
