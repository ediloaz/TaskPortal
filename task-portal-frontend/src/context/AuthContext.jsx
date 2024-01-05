import { useState, useEffect } from 'react'

import { AuthContext as authContext } from 'context/authContext'

import { signIn, checkSignIn, signOut, getUsernameCookie } from 'helpers/auth'

const AuthContext = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true)
  const [username, setUsername] = useState('')
  
  useEffect(() => {
    checkLogin()
  }, [])

  const login = async (_username, password) => {
    const isSigned = await signIn(_username, password)

    if (isSigned) {
      setUsername(_username)
      setIsLogged(true)
    }
  }

  const checkLogin = async () => {
    const _username = getUsernameCookie()
    const isSigned = await checkSignIn(_username)

    if (isSigned) {
      setUsername(_username)
      setIsLogged(true)
    }else{
      setIsLogged(false)
    }
  }

  const logout = async () => {
    await signOut()
    setUsername('')
    setIsLogged(false)
  }

  return (
    <authContext.Provider value={{ isLogged, username, login, logout }}> 
      { children }
    </authContext.Provider>

  )
}

export default AuthContext