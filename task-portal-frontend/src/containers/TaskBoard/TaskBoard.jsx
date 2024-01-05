import { useState, useEffect } from 'react'

import { getCards, addCard } from 'helpers/cards'

import TaskBoardComponent from 'components/TaskBoard/TaskBoard'

import { formatCardsByColumn } from './formatter'

const TaskBoard = () => {
  const [cards, setCards] = useState([])
  const [error, setError] = useState(false)
  // const [loading, setLoading] = useState(true)

  const updateCards = async () => {
    const _cards = await getCards()

    if (_cards.length) setCards(formatCardsByColumn(_cards))
    else if (_cards.length === 0) setCards([])
    else setError(true)
  }

  useEffect(() => {
    updateCards()
  }, [])

  const addNewCard = async (title, description) => {
    const answer = addCard(title, description)

    if (answer) updateCards()
  }
  
  return (
    <TaskBoardComponent cards={cards} addNewCard={addNewCard} />
  )
}

export default TaskBoard