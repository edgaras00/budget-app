import { useState, useEffect, useContext } from "react";

import AccountTotal from "./AccountTotal";
import AccountCard from "./AccountCard";
import CustomModal from "../dashboard/CustomModal";
import AccountForm from "./AccountForm";
import EmptyPage from "./EmptyPage";

import { ThemeContext } from "../../context/themeContext";

import useAuth from "../../hooks/useAuth";

import "./styles/accounts.css";

const Accounts = () => {
  useAuth();

  const { theme } = useContext(ThemeContext);

  const [accounts, setAccounts] = useState([]);
  const [formSubmit, setFormSubmit] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const rerenderAfterSubmit = () =>
    setFormSubmit((submission) => submission + 1);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        let url = "https://nextbudget-server.onrender.com/api/account/user";
        if (process.env.REACT_APP_ENV === "development") {
          url = "/api/account/user";
        }
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        setAccounts(responseData.data.accounts);
        setTotalBalance(responseData.data.totalBalance);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccounts();
  }, [formSubmit]);

  const accountCards = accounts.map((account) => {
    return (
      <AccountCard
        key={account.id}
        id={account.id}
        name={account.name}
        accountType={account.accountType}
        balance={account.balance}
        rerenderAfterSubmit={rerenderAfterSubmit}
      />
    );
  });

  return (
    <div
      className={`accounts-container ${
        theme === "dark" ? "accounts-container-dark" : null
      }`}
    >
      {accounts.length > 0 ? (
        <div className="flex-wrapper">
          <h1
            className={`accounts-heading ${
              theme === "dark" ? "accounts-heading-dark" : null
            }`}
          >
            Accounts
          </h1>
          <button
            className={`add-account ${
              theme === "dark" ? "add-account-dark" : null
            }`}
            onClick={handleOpenModal}
          >
            Add Account
          </button>
          <AccountTotal totalBalance={totalBalance} />
          <div className="accounts">{accountCards}</div>
        </div>
      ) : (
        <EmptyPage missingData="account" openModal={handleOpenModal} />
      )}
      <CustomModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        form={
          <AccountForm
            handleClose={handleCloseModal}
            rerenderAfterSubmit={rerenderAfterSubmit}
          />
        }
      />
    </div>
  );
};

export default Accounts;
