import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import Column from "./Column/Column";

import "./TaskBoard.sass";

const COLUMNS = [
  { id: "todo", name: "To do" },
  { id: "ip", name: "In progress" },
  { id: "done", name: "Done" },
];

const CARDS_MOCKUP = [
  {
    id: 1,
    title: "titulo 1",
    description: "description 1",
    user: "ediloaz",
    column: "todo",
  },
  {
    id: 2,
    title: "titulo 22",
    description: "description 22",
    user: "ediloaz",
    column: "done",
  },
  {
    id: 3,
    title: "titulo 223",
    description: "description 22",
    user: "ediloaz",
    column: "done",
  },
];

const formatCardsByColumn = (columns, cards) => {
  return cards.reduce((result, card) => {
    const columnId = card.column;
    if (!result[columnId]) {
      result[columnId] = [];
    }
    result[columnId].push(card);
    return result;
  }, {});
};

const TaskBoard = () => {
  const [cards, setCards] = useState(formatCardsByColumn(COLUMNS, CARDS_MOCKUP));

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
