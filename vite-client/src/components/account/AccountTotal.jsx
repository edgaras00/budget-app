import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import "./styles/accountTotal.css";

const AccountTotal = ({ totalBalance }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`account-total-container ${
        theme === "dark" ? "account-total-container-dark" : null
      }`}
    >
      <div className="total-text-wrapper">
        <div>Your total balance is</div>
      </div>
      <div className="total-balance-wrapper">
        <div className="total-balance">${totalBalance}</div>
      </div>
    </div>
  );
};

export default AccountTotal;
