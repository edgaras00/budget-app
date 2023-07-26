"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./budgetType.module.css";

const dummyData = {
  description: "subscriptions",
  moneyLeft: 5000,
  progress: 80,
};

const BudgetType = ({ category, amount }) => {
  return (
    <div className={`${styles.container} ${styles[dummyData.description]}`}>
      <div className={styles.left}>
        <div className={styles.logo}></div>
      </div>
      <div className={styles.right}>
        <div className={styles.description}>
          <div className={styles.text}>{category}</div>
          <div className={styles.money}>${amount} left</div>
        </div>
        <div className={styles.progress}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress
              variant="determinate"
              value={dummyData.progress}
              sx={{ height: "10px", borderRadius: "10px" }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default BudgetType;
