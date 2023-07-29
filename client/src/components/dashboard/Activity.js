import { useState, useContext } from "react";
import Transaction from "./Transaction";
import CustomModal from "./CustomModal";
import TransactionForm from "./TransactionForm";
import FilterForm from "./FilterForm";

import { ThemeContext } from "../../context/themeContext";

import filterImage from "../../images/filter.svg";
import filterImageDark from "../../images/filter-dark.svg";
import newTxnImage from "../../images/add.svg";
import newTxnImageDark from "../../images/add-dark.svg";

import "./styles/activity.css";

const Activity = ({
  transactions,
  setTransactions,
  rerenderAfterSubmit,
  toggleAmountSort,
  toggleDateSort,
  toggleAccountSort,
  toggleCategorySort,
}) => {
  const { theme } = useContext(ThemeContext);

  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const transactionCategories = transactions.map((transaction) => ({
    name: transaction.category.name,
    id: transaction.categoryId,
  }));

  console.log(transactionCategories);

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
          <div
            className={`select-option ${
              theme === "dark" ? "select-option-dark" : null
            }`}
            onClick={handleFilterOpen}
          >
            <img
              src={theme === "dark" ? filterImageDark : filterImage}
              alt="filter transactions"
              className="filter"
            />
            <div>Apply Filter</div>
          </div>
          <img
            src={theme === "dark" ? newTxnImageDark : newTxnImage}
            alt="add new transaction"
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
              <th onClick={toggleDateSort} className="table-header">
                Transaction
              </th>
              <th onClick={toggleAmountSort} className="table-header">
                Amount
              </th>
              <th onClick={toggleCategorySort} className="table-header">
                Category
              </th>
              <th onClick={toggleAccountSort} className="table-header">
                Account
              </th>
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
            transactionCategories={transactionCategories}
          />
        }
      />
    </div>
  );
};

export default Activity;
