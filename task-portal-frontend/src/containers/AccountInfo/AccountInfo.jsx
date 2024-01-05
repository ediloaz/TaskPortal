import { useContext } from 'react';

import { AuthContext } from 'context/authContext'

import Box from "@mui/material/Box";

import Modal from "components/Modal/Modal";

import "./AccountInfo.sass";


const Authentication = ({ isOpen, onClose }) => {
  const { userData } = useContext(AuthContext)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="authentication-modal-container"
    >
      <Box sx={{ width: "100%" }}>
        <h2>AccountInfo</h2>
        <p><b>Username:</b> {userData?.username}</p>
        <p><b>Age:</b> {userData?.age}</p>
        <p><b>Gender:</b> {userData?.gender}</p>
        <p><b>Phone:</b> {userData?.phone}</p>
      </Box>
    </Modal>
  );
};

export default Authentication;
