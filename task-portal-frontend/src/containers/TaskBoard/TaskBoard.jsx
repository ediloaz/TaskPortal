import { useState, useEffect } from 'react'

import { DEFAULT_COLUMN } from 'constants/column'
import { CARDS_MOCKUP, CARDS_STORAGE_ID } from 'constants/card'
import { BACKEND_URL } from 'constants/url'
import TaskBoardComponent from 'components/TaskBoard/TaskBoard'

const CARDS_GET_URL = 'card'
// const CARDS_POST_URL = 'card/post'

const formatCardsByColumn = (cards) => {
  return cards.reduce((result, card) => {
    const columnId = card.column || DEFAULT_COLUMN;
    if (!result[columnId]) {
      result[columnId] = [];
    }
    result[columnId].push(card);
    return result;
  }, {});
};

const retrievedObject = localStorage.getItem(CARDS_STORAGE_ID);
const parsedCards = JSON.parse(retrievedObject);

if (!parsedCards) {
  const serializedObject = JSON.stringify(CARDS_MOCKUP);
  localStorage.setItem(CARDS_STORAGE_ID, serializedObject);
}

const TaskBoard = () => {
  const [cards, setCards] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/${CARDS_GET_URL}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      const formattedCards = formatCardsByColumn(result)

      setCards(formattedCards);
    } catch (error) {
        const retrievedObject = localStorage.getItem(CARDS_STORAGE_ID);
        const parsedCards = JSON.parse(retrievedObject);
        const formattedCards = formatCardsByColumn(parsedCards)

        setCards(formattedCards);
        
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const addNewCard = () => {
    fetchData()
  }
  
  return (
    <TaskBoardComponent cards={cards} addNewCard={addNewCard} />
  )
}

export default TaskBoard