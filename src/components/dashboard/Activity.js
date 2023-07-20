import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import CustomModal from "../CustomModal";
import TransactionForm from "./TransactionForm";

import "./styles/activity.css";

const Activity = () => {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");

      try {
        if (!token) return;

        const response = await fetch(
          "http://localhost:5000/api/transactions/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const responseData = await response.json();
        console.log(responseData);

        setTransactions(responseData.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, []);

  const transactionComponents = transactions.map((transaction) => {
    return (
      <Transaction
        key={transaction.id}
        id={transaction.id}
        name={transaction.name}
        amount={transaction.amount}
        date={transaction.date}
        category={transaction.category.name}
        account={transaction.account ? transaction.account.name : ""}
      />
    );
  });

  return (
    <div className="activity-container">
      <div className="activity-top">
        <div className="activity-heading">Transactions</div>
        <div className="activity-options">
          <div className="select-option">
            {/* <Image
              src="assets/images/date.svg"
              alt="select date"
              width={28}
              height={28}
            /> */}
            <div>Select date</div>
          </div>
          <div className={styles["select-option"]}>
            {/* <Image
              src="assets/images/filter.svg"
              alt="select date"
              width={28}
              height={28}
            /> */}
            <div>Apply filter</div>
          </div>
          {/* <Image
            className={styles.add}
            onClick={handleOpen}
            src="assets/images/add.svg"
            alt="add transaction"
            width={44}
            height={44}
          /> */}
        </div>
      </div>
      {transactions.length === 0 ? (
        <div className="empty-list">
          <div>No transaction activity</div>
        </div>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Account</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-body">{transactionComponents}</tbody>
        </table>
      )}

      <CustomModal
        open={open}
        handleClose={handleClose}
        form={<TransactionForm />}
      />
    </div>
  );
};

export default Activity;
