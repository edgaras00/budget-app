import { useContext } from "react";

import { ThemeContext } from "../../context/themeContext";

import emptyImage from "../../images/blank.svg";

import "./styles/emptyPage.css";

const EmptyPage = ({ missingData, openModal }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="empty-container">
      <div
        className={`empty-content ${
          theme === "dark" ? "empty-content-dark" : null
        }`}
        onClick={openModal}
      >
        <h1 className="empty-heading">You have no {missingData} data</h1>
        <div
          className={`empty-add-data ${
            theme === "dark" ? "empty-add-data-dark" : null
          }`}
        >
          Add {missingData}
        </div>
        <img src={emptyImage} alt="blank page" width={100} height={100} />
      </div>
    </div>
  );
};

export default EmptyPage;
