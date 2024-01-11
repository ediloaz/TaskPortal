import { STATUS_CODE } from 'constants/http'
import { BACKEND_URL } from 'constants/url'
import { setCookie, getCookie } from 'helpers/cookies'

const SIGN_IN_URL = "account/login"
const SIGN_OUT_URL = "account/logout"
const SIGN_UP_IN_URL = "account/signup"
const CHECK_SIGN_IN_URL = "account/checkLogin"
const CSRF_TOKEN = "csrf-token"
const USERNAME = "user-username"
const USER_ID = "user-id"

export const signIn = async ({ username, password, setUserData }) => {
  const postData = { username, password }

  const response = await fetch(`${BACKEND_URL}/${SIGN_IN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(postData),
  });

  if (response.status === STATUS_CODE.OK) {
    console.log('User logged in successfully, username: ' + username)
    const user = await response.json() || {}
    
    setCookie(CSRF_TOKEN, user?.csrfToken, 7)
    setCookie(USERNAME, user?.username, 7)
    sessionStorage.setItem(USER_ID, user?.id)
    sessionStorage.setItem(USERNAME, user?.username)

    if (setUserData) {
      setUserData(user)
    }

    return true
  } else {
    console.log('Incorrect data to login , username: ' + username)

    return false
  }
}

export const checkSignIn = async ({ username, setUserData }) => {
  const postData = { username, csrfToken: getAuthCookie() }

  const response = await fetch(`${BACKEND_URL}/${CHECK_SIGN_IN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(postData),
  });

  if (response.status === STATUS_CODE.OK) {
    console.log('User until is logged, username: ' + username)

    if (setUserData) {
      const user = await response.json() || {}
      setUserData(user)
    }

    return true
  } else {
    console.log('User is not logged, username: ' + username)

    return false
  }
}

export const signUp = async ({ username, password, age, phone, gender, setUserData }) => {
  const postData = { username, password, age, phone, gender }

  const response = await fetch(`${BACKEND_URL}/${SIGN_UP_IN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(postData),
  });

  if (response.status === STATUS_CODE.CREATED) {
    console.log('User logged in successfully, username: ' + username)
    const user = await response.json() || {}

    setCookie(CSRF_TOKEN, user?.csrfToken, 7)
    setCookie(USERNAME, user?.username, 7)
    sessionStorage.setItem(USER_ID, user?.id)
    sessionStorage.setItem(USERNAME, user?.username)
    
    if (setUserData) {
      setUserData(user)
    }

    return true
  } else {
    console.log('User incorrect, username: ' + username)

    return false
  }
}

export const signOut = async () => {
  const postData = { username: getUsernameCookie() }

  await fetch(`${BACKEND_URL}/${SIGN_OUT_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(postData),
  });

  setCookie(CSRF_TOKEN, null, 7)
  setCookie(USERNAME, null, 7)
  sessionStorage.setItem(USER_ID, null)
  sessionStorage.setItem(USERNAME, null)
}

export const getAuthCookie = () => getCookie(CSRF_TOKEN)

export const getUserIdCookie = () => getCookie(USER_ID)

export const getUsernameCookie = () => getCookie(USERNAME)

export const getAuthHeader = () => ({ 'X-CSRF-Token': getAuthCookie()})