import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "components/Modal/Modal";

import "./ServerDownHandler.sass";


const ServerDownHandler = ({ useOfflineMode }) => {
  return (
    <Modal
      isOpen={true}
      className="offline-modal-container"
    >
      <Box sx={{ width: "100%" }}>
        <h2>No Server Connection</h2>
        <p>The connection to the Quarkus server could not be established.</p>
        <p><b>Do you want to use the interface in offline mode?</b></p>
      </Box>
      <Button variant="contained" onClick={useOfflineMode}>Accept</Button>
    </Modal>
  );
};

export default ServerDownHandler;
