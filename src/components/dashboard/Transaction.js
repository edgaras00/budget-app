import { useState } from "react";
import dayjs from "dayjs";
// import Image from "next/image";

import CustomModal from "../CustomModal";
import TransactionForm from "./TransactionForm";

import "./styles/transaction.css";

const dummyData = {
  amount: 1000000000,
  category: "clothing",
  paymentType: "Debit",
  account: "Chase",
  date: dayjs().format("DD MMM YYYY"),
  description: "Spotify",
  logo: "https://logo.clearbit.com/spotify.com",
};

const centsToDollars = (amountCents: number) => {
  return amountCents / 100;
};

const Transaction = ({ name, amount, category, account, date, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const removeTransaction = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className="table-row">
      <td className="transaction">
        <div className="image-container">
          {/* <Image
            src={dummyData.logo}
            alt="Transaction icon"
            layout="responsive"
            width={35}
            height={35}
          /> */}
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
        <div className="category">&#x2022; {category}</div>
      </td>
      <td className="transaction-account">
        <div className="transaction-type">{account}</div>
        <div className="transaction-account-name">{account}</div>
      </td>
      <td className="transaction-remove">
        <div onClick={handleModalOpen}>Edit</div>
        <div onClick={removeTransaction}>Remove</div>
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
            />
          }
        />
      </td>
    </tr>
  );
};

export default Transaction;
