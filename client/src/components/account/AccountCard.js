import { useState } from "react";
import CustomModal from "../dashboard/CustomModal";
import AccountForm from "./AccountForm";
import "./styles/accountCard.css";

const AccountCard = ({
  name,
  accountType,
  balance,
  id,
  rerenderAfterSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const removeAccount = async () => {
    const token = localStorage.getItem("token");
    try {
      let url = `https://nextbudget-server.onrender.com/api/account/${id}`;
      if (process.env.REACT_APP_ENV === "development") {
        url = `/api/account/${id}`;
      }
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Something went wronf");
      rerenderAfterSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account-container">
      <div className="account-name-wrapper">
        <div className="account-name">{name}</div>
        <div className="account-type">{accountType}</div>
      </div>
      <div className="account-balance">${balance}</div>
      <div className="account-buttons">
        <div onClick={handleOpenModal} className="account-action edit">
          Edit
        </div>
        <div onClick={removeAccount} className="account-action">
          Remove
        </div>
      </div>
      <CustomModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        form={
          <AccountForm
            modify={true}
            accountId={id}
            name={name}
            accountType={accountType}
            balance={balance}
            rerenderAfterSubmit={rerenderAfterSubmit}
            handleClose={handleCloseModal}
          />
        }
      />
    </div>
  );
};

export default AccountCard;
