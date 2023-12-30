import { useState, useEffect } from 'react'

import { DEFAULT_COLUMN } from 'constants/column'
import { CARDS_MOCKUP } from 'constants/card'
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


const TaskBoard = () => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/${CARDS_GET_URL}`);
        
        if (!response.ok) {
          const formattedCards = formatCardsByColumn(CARDS_MOCKUP)

          setCards(formattedCards);

          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        const formattedCards = formatCardsByColumn(result)

        setCards(formattedCards);
      } catch (error) {
        const formattedCards = formatCardsByColumn(CARDS_MOCKUP)

          setCards(formattedCards);
          
        console.error('Error fetching data:', error.message);
      }
    };

    // Llamar a la función para realizar la solicitud
    fetchData();
  }, [])
  
  return (
    <TaskBoardComponent cards={cards} />
  )
}

export default TaskBoard