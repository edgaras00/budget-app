import { useState } from "react";
// import Link from "next/link";

import CustomModal from "./CustomModal";
// import BudgetForm from "../BudgetForm";

import "./styles/goalsButton.css";

const GoalsButton = ({ text, type = 1, link }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const typeClass = type === 2 ? "type-two" : null;

  // if (type === 2) {
  //   return (
  //     <Link href={link} className={`${styles.setgoals} ${typeClass}`}>
  //       <div>{text}</div>
  //     </Link>
  //   );
  // }
  return (
    <div className={`set-goals ${typeClass}`}>
      <div className="goals-content" onClick={handleModalOpen}>
        {text}
      </div>
      <CustomModal
        open={isModalOpen}
        handleClose={handleModalClose}
        // form={<BudgetForm />}
      />
    </div>
  );
};

export default GoalsButton;
