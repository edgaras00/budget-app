import { useState } from "react";
import CustomModal from "../CustomModal";
import AccountForm from "./AccountForm";
import "./styles/accountCard.css";

const AccountCard = ({ name, accountType, balance, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const removeAccount = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:5000/api/account/${id}`, {
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
    <div className="account-container">
      <div className="account-name-wrapper">
        <div className="account-name">{name}</div>
        <div className="account-type">{accountType}</div>
      </div>
      <div className="account-balance">{balance}</div>
      <div className="account-buttons">
        <div onClick={handleOpenModal} className="account-edit">
          Edit
        </div>
        <div onClick={removeAccount}>Remove</div>
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
          />
        }
      />
    </div>
  );
};

export default AccountCard;
