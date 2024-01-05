import { STATUS_CODE } from 'constants/http'
import { BACKEND_URL } from 'constants/url'

import { getAuthHeader } from 'helpers/auth'

const CARDS_URL = 'card'

export const getCards = async (username, password) => {
  try {
    const response = await fetch(`${BACKEND_URL}/${CARDS_URL}`)
    
    if (response.status === STATUS_CODE.OK) {
      const cards = await response.json()

      return cards
    } else {
      console.error('Network response was not ok')

      return false
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)

    return false
  }
}

export const addCard = async (title, description) => {
  const ownerId = parseInt(sessionStorage.getItem('user_id')) || 0
  const postData = { title, description, status: 'todo', ownerId }
  
  try{
    console.log(1)
    const response = await fetch(`${BACKEND_URL}/${CARDS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(postData),
    })
    console.log(2)
    return response.status === STATUS_CODE.OK
  }catch(e){
    console.log(e.message)
  }
  

}