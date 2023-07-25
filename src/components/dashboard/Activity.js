import { useState, useEffect, useContext } from "react";
import Transaction from "./Transaction";
import CustomModal from "./CustomModal";
import TransactionForm from "./TransactionForm";
import FilterForm from "./FilterForm";

import { ThemeContext } from "../../context/themeContext";

import filterImage from "../../images/filter.svg";
import newTxnImage from "../../images/add.svg";

import "./styles/activity.css";

const Activity = () => {
  const { theme } = useContext(ThemeContext);

  const [transactions, setTransactions] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(0);

  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const rerenderAfterSubmit = () => setFormSubmitted((submit) => submit + 1);

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

        setTransactions(responseData.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, [formSubmitted]);

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
        accountType={transaction.account ? transaction.account.accountType : ""}
        rerenderAfterSubmit={rerenderAfterSubmit}
      />
    );
  });

  return (
    <div
      className={`activity-container ${
        theme === "dark" ? "activity-container-dark" : null
      }`}
    >
      <div className="activity-top">
        <div className="activity-heading">Transactions</div>
        <div className="activity-options">
          <div className="select-option" onClick={handleFilterOpen}>
            <img
              src={filterImage}
              alt="filter transactions"
              width={28}
              height={28}
            />
            <div>Apply filter</div>
          </div>
          <img
            src={newTxnImage}
            alt="add new transaction"
            width={44}
            height={44}
            className="add"
            onClick={handleOpen}
          />
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
        form={
          <TransactionForm
            rerenderAfterSubmit={rerenderAfterSubmit}
            handleClose={handleClose}
          />
        }
      />
      <CustomModal
        open={filterOpen}
        handleClose={handleFilterClose}
        form={
          <FilterForm
            rerenderAfterSubmit={rerenderAfterSubmit}
            handleClose={handleFilterClose}
            setTransactions={setTransactions}
          />
        }
      />
    </div>
  );
};

export default Activity;
