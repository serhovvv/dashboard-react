import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function BasicModal({ children, open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div
          className="absolute 
          top-1/2 
          left-1/2 
          -translate-x-1/2 
          -translate-y-1/2
         
        bg-green-50 
          rounded-xl
          shadow-md 
         "
        >
          {children}
        </div>
      </Modal>
    </div>
  );
}
