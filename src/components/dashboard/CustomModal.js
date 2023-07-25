import { useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { ThemeContext } from "../../context/themeContext";

import "./styles/customModal.css";

const CustomModal = ({ open, handleClose, form }) => {
  const { theme } = useContext(ThemeContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "86vh",
    // width: 500,
    bgcolor: theme === "dark" ? "#4e4e4e" : "background.paper",
    boxShadow: 24,
    p: 4,
    border: "none",
    borderRadius: "8px",
    overflowY: "auto",
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <div className="close" onClick={handleClose}>
            X
          </div>
          {form}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
