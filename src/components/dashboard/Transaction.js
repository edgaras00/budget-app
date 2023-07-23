import { useState } from "react";
import dayjs from "dayjs";

import CustomModal from "./CustomModal";
import TransactionForm from "./TransactionForm";

import defaultImage from "../../images/default.svg";

import "./styles/transaction.css";

const dummyData = {
  amount: 1000000000,
  category: "clothing",
  paymentType: "Debit",
  account: "Chase",
  date: dayjs().format("DD MMM YYYY"),
  description: "Spotify",
  logo: "https://logo.clearbit.com/starbucks.com",
};

const centsToDollars = (amountCents) => {
  return amountCents / 100;
};

const Transaction = ({
  name,
  amount,
  category,
  account,
  accountType,
  date,
  id,
  rerenderAfterSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const removeTransaction = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      rerenderAfterSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className="table-row">
      <td className="transaction">
        <div className="image-container">
          <img
            src={
              imageLoadError
                ? defaultImage
                : `https://logo.clearbit.com/${name}.com`
            }
            alt="Transaction icon"
            onError={handleImageError}
          />
        </div>
        <div className="transaction-name">
          <div className="name-text">{name}</div>
          <div className="transaction-date">
            {dayjs(date).format("DD MMM YYYY")}
          </div>
        </div>
      </td>
      <td className="transaction-amount">${centsToDollars(amount)}</td>
      <td>
        <div className={`category ${category.toLowerCase()}`}>{category}</div>
      </td>
      <td className="transaction-account">
        <div className="txn-account-name">{account}</div>
        <div className="txn-account-type">{accountType}</div>
      </td>
      <td className="transaction-edit">
        <div onClick={handleModalOpen} className="edit-txn">
          Edit
        </div>
        <div onClick={removeTransaction} className="edit-txn">
          Remove
        </div>
        <CustomModal
          open={isModalOpen}
          handleClose={handleModalClose}
          form={
            <TransactionForm
              id={id}
              name={name}
              date={dayjs(date).format("YYYY-MM-DD")}
              amount={amount}
              category={category}
              account={account}
              modify={true}
              handleClose={handleModalClose}
              rerenderAfterSubmit={rerenderAfterSubmit}
            />
          }
        />
      </td>
    </tr>
  );
};

export default Transaction;
