import { useCallback, useState } from "react";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Title from "@mui/icons-material/Title";
import Description from "@mui/icons-material/Description";

import Modal from "components/Modal/Modal";
import { COLUMNS } from "constants/column";
import { CARDS_STORAGE_ID } from "constants/card";

import Column from "./Column/Column";

import "./TaskBoard.sass";

const FormToAddNewCard = ({ addCard, onTitleChange, onDescriptionChange }) => {
  return (
    <Card className="new-card-container">
      <Box>
        <Title />
        <TextField
          id="input-title"
          label="Title"
          type="text"
          variant="standard"
          onChange={onTitleChange}
        />
      </Box>
      <Box>
        <Description />
        <TextField
          id="input-description"
          label="Description"
          variant="standard"
          onChange={onDescriptionChange}
        />
      </Box>
      <Button onClick={addCard}>Agregar tarea</Button>
    </Card>
  );
};

const TaskBoard = ({ cards, addNewCard }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onTitleChange = (event) => setTitle(event?.target?.value);
  const onDescriptionChange = (event) => setDescription(event?.target?.value);

  const addCard = useCallback(() => {
    addNewCard(title, description);
    setTitle("");
    setDescription("");
    handleClose();
  }, [addNewCard, title, description]);

  return (
    <div className="task-board-container">
      <div className="columns-container">
        {COLUMNS.map(({ id, name }) => (
          <Column key={name} title={name} cards={cards?.[id]} />
        ))}
      </div>
      <Modal isOpen={open} onClose={handleClose}>
        <FormToAddNewCard
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
    </div>
  );
};
export default TaskBoard;
