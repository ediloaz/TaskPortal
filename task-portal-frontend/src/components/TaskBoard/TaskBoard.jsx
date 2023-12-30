import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { COLUMNS } from 'constants/column'

import Column from "./Column/Column";

import "./TaskBoard.sass";


const TaskBoard = ({ cards }) => {
  const addCard = () => {
    // eslint-disable-next-line no-console
    console.log("	🎮 22", 11);
  };

  return (
    <div className="task-board-container">
      <div className="columns-container">
        {COLUMNS.map(({ id, name }) => (
          <Column title={name} cards={cards?.[id]} />
        ))}
      </div>
      <Fab
        className="button-new-card"
        color="secondary"
        aria-label="add-card"
        onClick={addCard}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};
export default TaskBoard;
