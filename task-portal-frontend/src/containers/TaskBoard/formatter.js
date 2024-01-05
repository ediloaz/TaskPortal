import { COLUMNS } from 'constants/column'

export const formatCardsByColumn = (cards) => {
  const cardsWithColumns = COLUMNS.reduce((result, column) => {
    const columnId = column.id;
    const columnCards = cards.filter(card => card.status === columnId);
    result[columnId] = columnCards || [];
    return result;
  }, {});
  
  return cardsWithColumns;
}