import { STATUS_CODE } from 'constants/http'
import { BACKEND_URL } from 'constants/url'

import { getAuthHeader } from 'helpers/auth'

const CARDS_URL = 'card'
const BY_OWNER_URL = `${CARDS_URL}/byOwnerId`
const UPDATE_STATUS_URL = `${CARDS_URL}/updateStatus`

export const getCards = async (username, password) => {
  try {
    const ownerId = parseInt(sessionStorage.getItem('user-id')) || 0
    const response = await fetch(`${BACKEND_URL}/${BY_OWNER_URL}/${ownerId}`)
    
    if (response.status === STATUS_CODE.OK) {
      const cards = await response.json()

      return cards
    } else {
      console.error('Network response was not ok')
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)

    return false
  }
}

export const addCard = async (title, description) => {
  const ownerId = parseInt(sessionStorage.getItem('user-id')) || 0
  const postData = { title, description, status: 'todo', ownerId }
  
  try{
    const response = await fetch(`${BACKEND_URL}/${CARDS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(postData),
    })

    return response.status === STATUS_CODE.CREATED
  }catch(e){
    console.log(e.message)
  }
}

export const changeStatusCard = async (id, status) => {
  const postData = { id, status }
  
  try{
    const response = await fetch(`${BACKEND_URL}/${UPDATE_STATUS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(postData),
    })

    return response.status === STATUS_CODE.OK
  }catch(e){
    console.log(e.message)
  }
}

export const updateImageCard = async (id, base64) => {
  const postData = { id, image: base64 };
  
  try{
    const response = await fetch(`${BACKEND_URL}/${CARDS_URL}/updateImage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(postData),
    })

    return response.status === STATUS_CODE.OK
  }catch(e){
    console.log(e.message)
  }
}

export const insertObjectToPosition = (oldArray, newArray, objectId, newPosition) => {
  console.log(oldArray, newArray, objectId, newPosition)
  const objectToMove = oldArray.find(obj => obj.id === objectId);

  if (!objectToMove) {
      console.log(`No se encontró ningún objeto con el ID ${objectId}`);
      return oldArray; // No se encontró el objeto, devuelve la lista sin cambios
  }

  // Inserta el objeto en la nueva posición
  newArray.splice(newPosition, 0, objectToMove);

  return newArray;
}

export const removeObjectToPosition = (array, objectId) => {
  const objectToMove = array.find(obj => obj.id === objectId);

  if (!objectToMove) {
      console.log(`No se encontró ningún objeto con el ID ${objectId}`);
      return array; // No se encontró el objeto, devuelve la lista sin cambios
  }

  const currentIndex = array.indexOf(objectToMove);

  // Remueve el objeto de su posición actual
  array.splice(currentIndex, 1);

  return array;
}

export const moveObjectToPosition = (array, objectId, newPosition) => {
  const objectToMove = array.find(obj => obj.id === objectId);

  if (!objectToMove) {
      console.log(`No se encontró ningún objeto con el ID ${objectId}`);
      return array; // No se encontró el objeto, devuelve la lista sin cambios
  }

  const currentIndex = array.indexOf(objectToMove);

  if (currentIndex === newPosition) {
      console.log(`El objeto ya está en la posición ${newPosition}`);
      return array; // El objeto ya está en la posición deseada, devuelve la lista sin cambios
  }

  // Remueve el objeto de su posición actual
  array.splice(currentIndex, 1);

  // Inserta el objeto en la nueva posición
  array.splice(newPosition, 0, objectToMove);

  return array;
}