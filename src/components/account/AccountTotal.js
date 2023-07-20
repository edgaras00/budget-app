import "./styles/accountTotal.css";

const AccountTotal = ({ totalBalance }) => {
  return (
    <div className="account-total-container">
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
