import { useState, useContext } from "react";
import dayjs from "dayjs";

import CustomModal from "./CustomModal";
import TransactionForm from "./TransactionForm";

import { ThemeContext } from "../../context/themeContext";
import useWidth from "../../hooks/useWidth";

// Images
import clothingImage from "../../images/clothing.svg";
import clothingImageDark from "../../images/clothing-dark.svg";
import charityImage from "../../images/charity.svg";
import educationImage from "../../images/education.svg";
import educationImageDark from "../../images/education-dark.svg";
import foodImage from "../../images/food.svg";
import groceriesImage from "../../images/groceries.svg";
import transportationImage from "../../images/transportation.svg";
import householdImage from "../../images/household.svg";
import householdImageDark from "../../images/household-dark.svg";
import utilitiesImage from "../../images/utilities.svg";
import savingsImage from "../../images/savings.svg";
import incomeImage from "../../images/income.svg";
import healthcareImage from "../../images/healthcare.svg";
import subscriptionImage from "../../images/subscription.svg";
import travelImage from "../../images/travel.svg";
import entertainmentImage from "../../images/entertainment.svg";
import hygieneImage from "../../images/hygiene.svg";
import childcareImage from "../../images/childcare.svg";
import petsImage from "../../images/pets.svg";
import technologyImage from "../../images/technology.svg";
import sportsImage from "../../images/sports.svg";
import miscImage from "../../images/default.svg";

import "./styles/transaction.css";

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
  const { theme } = useContext(ThemeContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const [imageLoadError, setImageLoadError] = useState(false);
  const { width } = useWidth();

  let defaultImg = miscImage;

  switch (category) {
    case "clothing":
      defaultImg = theme === "dark" ? clothingImageDark : clothingImage;
      break;
    case "charity":
      defaultImg = charityImage;
      break;
    case "education":
      defaultImg = theme === "dark" ? educationImageDark : educationImage;
      break;
    case "food":
      defaultImg = foodImage;
      break;
    case "transportation":
      defaultImg = transportationImage;
      break;
    case "household":
      defaultImg = theme === "dark" ? householdImageDark : householdImage;
      break;
    case "utilities":
      defaultImg = utilitiesImage;
      break;
    case "savings":
      defaultImg = savingsImage;
      break;
    case "income":
      defaultImg = incomeImage;
      break;
    case "healthcare":
      defaultImg = healthcareImage;
      break;
    case "groceries":
      defaultImg = groceriesImage;
      break;
    case "subscriptions":
      defaultImg = subscriptionImage;
      break;
    case "travel":
      defaultImg = travelImage;
      break;
    case "entertainment":
      defaultImg = entertainmentImage;
      break;
    case "pets":
      defaultImg = petsImage;
      break;
    case "childcare":
      defaultImg = childcareImage;
      break;
    case "technology":
      defaultImg = technologyImage;
      break;
    case "hygiene":
      defaultImg = hygieneImage;
      break;
    case "sports":
      defaultImg = sportsImage;
      break;
    default:
      defaultImg = miscImage;
  }

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const removeTransaction = async () => {
    const token = localStorage.getItem("token");

    try {
      let url = `https://nextbudget-server.onrender.com/api/transactions/${id}`;
      if (process.env.REACT_APP_ENV) {
        url = `api/transactions/${id}`;
      }
      await fetch(url, {
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
    <tr
      className={`table-row ${theme === "dark" ? "table-row-dark" : null}`}
      onClick={width <= 450 && !isModalOpen ? handleModalOpen : null}
    >
      <td className="transaction">
        <div className="image-container">
          <img
            src={
              imageLoadError
                ? defaultImg
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
      <td className="transaction-amount">${amount}</td>
      <td>
        <div className={`category ${category.toLowerCase()}`}>
          {category === "food" ? "Food and Drink" : category}
        </div>
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
              mobile={width < 600 ? true : false}
              removeTransaction={removeTransaction}
            />
          }
        />
      </td>
    </tr>
  );
};

export default Transaction;
