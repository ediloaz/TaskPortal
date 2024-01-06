import { useContext, useState, useEffect } from 'react'

import { CARDS_MOCKUP } from 'constants/card'
import { getCards, addCard } from 'helpers/cards'
import { AuthContext } from 'context/authContext'

import TaskBoardComponent from 'components/TaskBoard/TaskBoard'

import { formatCardsByColumn } from './formatter'

const TaskBoard = () => {
  const [cards, setCards] = useState([])

  const { offlineMode } = useContext(AuthContext)

  const updateCards = async () => {
    const _cards = await getCards()

    if (_cards.length) setCards(formatCardsByColumn(_cards))
    else if (_cards.length === 0) setCards([])
  }

  useEffect(() => {
    if (offlineMode) setCards(formatCardsByColumn(CARDS_MOCKUP))
    else updateCards()
  }, [])

  const addNewCard = async (title, description) => {
    if (offlineMode) {
      setCards({
        ...cards,
        todo: [
          ...cards?.todo,
          {
            id: cards?.todo?.length + cards?.ip?.length + cards?.done?.length + 1,
            title,
            description,
            status: 'todo',
            position: cards?.todo?.length
          }
        ],
      })
    } else {
      const answer = await addCard(title, description)
  
      if (answer) updateCards()
    }
  }
  
  return (
    <TaskBoardComponent cards={cards} addNewCard={addNewCard} />
  )
}

export default TaskBoard