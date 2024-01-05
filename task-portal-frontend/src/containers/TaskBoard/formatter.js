import { DEFAULT_COLUMN } from 'constants/column'

export const formatCardsByColumn = (cards) => {
  return cards.reduce((result, card) => {
    const columnId = card.column || DEFAULT_COLUMN
    if (!result[columnId]) {
      result[columnId] = []
    }
    result[columnId].push(card)
    return result
  }, {})
}