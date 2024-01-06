import { useCallback, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { COLUMNS } from "constants/column";
import { changeStatusCard, insertObjectToPosition, removeObjectToPosition, moveObjectToPosition } from 'helpers/cards'

import Avatar from '@mui/material/Avatar';

import BoardCard from "components/TaskBoard/Card/Card";
import AddCard from "components/TaskBoard/AddCard/AddCard";

import "./TaskBoard.sass";
import { getItemStyle, getListStyle } from './styles'

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

  const onDragEnd = (result) => {
    const cardId = parseInt(result?.draggableId)
    const {source, destination} = result

    if (!destination) return

    // Just change the index in same column
    if (source.droppableId === destination.droppableId) {
      moveObjectToPosition(cards?.[source?.droppableId], cardId, parseInt(destination?.index))
    } else {
      changeStatusCard(cardId, destination?.droppableId)
      insertObjectToPosition(cards?.[source?.droppableId], cards?.[destination?.droppableId], cardId, parseInt(destination?.index))
      removeObjectToPosition(cards?.[source?.droppableId], cardId)
    }
  }

  return (
    <div className="task-board-container">
      <div className="columns-container">
      <DragDropContext onDragEnd={onDragEnd}>
        {COLUMNS.map((column, index) => (
          <Droppable key={column?.id} droppableId={column?.id}>
            {(provided, snapshot) => (
              <div
                className='column-container'
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                  <div className='title' style={{ backgroundColor: column?.color}}>
                    <span>{column.title}</span>
                    <Avatar className="avatar" sx={{ color: 'black', bgcolor: "white" }}>{cards?.[column?.id]?.length || 0}</Avatar>
                  </div>
                  {cards?.[column?.id]?.map( (card, index) => (
                    <Draggable
                      key={`${card?.id}`}
                      draggableId={`${card?.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <BoardCard key={card?.id} {...card} />
                          </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
              </div>
            )}
        </Droppable>
        ))}
      </DragDropContext>
    </div>
    <AddCard
      open={open}
      addCard={addCard}
      handleOpen={handleOpen}
      handleClose={handleClose}
      onTitleChange={onTitleChange}
      onDescriptionChange={onDescriptionChange}
    />
  </div>
  );
};
export default TaskBoard;
