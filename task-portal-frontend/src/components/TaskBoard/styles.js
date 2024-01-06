const GRID = 0;

export const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: GRID * 2,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "inherit",

  ...draggableStyle
});
export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: GRID,
  width: 250
});
