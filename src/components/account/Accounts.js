import { useState, useEffect } from "react";

import AccountTotal from "./AccountTotal";
import AccountCard from "./AccountCard";
import CustomModal from "../dashboard/CustomModal";
import AccountForm from "./AccountForm";
import EmptyPage from "./EmptyPage";

import { setRequestOptions } from "../../utils/utils";

import useAuth from "../../hooks/useAuth";

import "./styles/accounts.css";

const Accounts = () => {
  useAuth();
  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);

        if (!token) {
          return;
        }

        const response: Response = await fetch(
          "http://localhost:5000/api/account/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        setAccounts(responseData.data.accounts);
        setTotalBalance(responseData.data.totalBalance);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccounts();
  }, []);

  const accountCards = accounts.map((account) => {
    return (
      <AccountCard
        key={account.id}
        id={account.id}
        name={account.name}
        accountType={account.accountType}
        balance={account.balance}
      />
    );
  });

  return (
    <div className="accounts-container">
      {accounts.length > 0 ? (
        <div className="flex-wrapper">
          <h1 className="accounts-heading">Accounts</h1>
          <button className="add-account" onClick={handleOpenModal}>
            Add Account
          </button>
          <AccountTotal totalBalance={totalBalance} />
          <div className="accounts">
            {/* <AccountCard />
            <AccountCard />
            <AccountCard /> */}
            {accountCards}
          </div>
        </div>
      ) : (
        <EmptyPage missingData="account" openModal={handleOpenModal} />
      )}
      <CustomModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        form={<AccountForm />}
      />
    </div>
  );
};

export default Accounts;
