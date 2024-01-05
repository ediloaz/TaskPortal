import { STATUS_CODE } from 'constants/http'
import { BACKEND_URL } from 'constants/url'
import { setCookie, getCookie } from 'helpers/cookies'

const SIGN_IN_URL = "account/login"
const SIGN_OUT_URL = "account/logout"
const CHECK_SIGN_IN_URL = "account/checkLogin"
const COOKIE_CSRF_TOKEN = "csrf-token"
const COOKIE_USERNAME = "user-username"
const COOKIE_USER_ID = "user-id"

export const signIn = async (username, password) => {
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
    
    setCookie(COOKIE_CSRF_TOKEN, user?.csrfToken, 7)
    setCookie(COOKIE_USERNAME, user?.username, 7)
    sessionStorage.setItem(COOKIE_USER_ID, user?.id)
    sessionStorage.setItem(COOKIE_USERNAME, user?.username)

    return true
  } else {
    console.log('User incorrect, username: ' + username)

    return false
  }
}


export const checkSignIn = async (username) => {
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

    return true
  } else {
    console.log('User is not logged, username: ' + username)

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

  setCookie(COOKIE_CSRF_TOKEN, null, 7)
  setCookie(COOKIE_USERNAME, null, 7)
  sessionStorage.setItem(COOKIE_USER_ID, null)
  sessionStorage.setItem(COOKIE_USERNAME, null)
}

export const getAuthCookie = () => getCookie(COOKIE_CSRF_TOKEN)

export const getUserIdCookie = () => getCookie(COOKIE_USER_ID)

export const getUsernameCookie = () => getCookie(COOKIE_USERNAME)

export const getAuthHeader = () => ({ 'X-CSRF-Token': getAuthCookie()})