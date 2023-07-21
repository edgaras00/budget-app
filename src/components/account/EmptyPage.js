import emptyImage from "../../images/blank.svg";
import "./styles/emptyPage.css";

const EmptyPage = ({ missingData, openModal }) => {
  return (
    <div className="empty-container">
      <div className="empty-content" onClick={openModal}>
        <h1 className="empty-heading">You have no {missingData} data</h1>
        <div className="empty-add-data">Add {missingData}</div>
        <img src={emptyImage} alt="blank page" width={100} height={100} />
      </div>
    </div>
  );
};

export default EmptyPage;
