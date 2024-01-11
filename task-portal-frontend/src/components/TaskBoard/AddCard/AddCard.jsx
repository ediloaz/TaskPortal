import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Title from "@mui/icons-material/Title";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Description from "@mui/icons-material/Description";

import Modal from "components/Modal/Modal";

const AddCardForm = ({ addCard, onTitleChange, onDescriptionChange }) => {
  return (
    <Card className="new-card-container">
      <Box>
        <Title />
        <TextField
          id="input-title"
          label="Title"
          type="text"
          variant="standard"
          size="medium"
          onChange={onTitleChange}
        />
      </Box>
      <Box>
        <Description />
        <TextField
          id="input-description"
          label="Description"
          variant="standard"
          size="medium"
          onChange={onDescriptionChange}
        />
      </Box>
      <Button onClick={addCard}>Agregar tarea</Button>
    </Card>
  );
};

const AddCard = ({open, addCard, handleOpen, handleClose, onTitleChange, onDescriptionChange}) => {
  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <AddCardForm
          addCard={addCard}
          onTitleChange={onTitleChange}
          onDescriptionChange={onDescriptionChange}
        />
      </Modal>
      <Fab
        className="button-new-card"
        color="secondary"
        aria-label="add-card"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default AddCard