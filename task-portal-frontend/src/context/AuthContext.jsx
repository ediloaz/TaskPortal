import { useState, useEffect } from 'react'

import { AuthContext as authContext } from 'context/authContext'

import { signIn as _signIn, signUp as _signUp, checkSignIn, signOut, getUsernameCookie } from 'helpers/auth'

const AuthContext = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true)
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState({})
  
  useEffect(() => {
    checkLogin()
  }, [])

  const login = async (_username, password) => {
    const isSigned = await _signIn({ username: _username, password, setUserData })

    if (isSigned) {
      setUsername(_username)
      setIsLogged(true)
    }
  }

  const checkLogin = async () => {
    const _username = getUsernameCookie()
    const isSigned = await checkSignIn({ username: _username, setUserData })

    if (isSigned) {
      setUsername(_username)
      setIsLogged(true)
    }else{
      setIsLogged(false)
    }
  }

  const register = async ({ username: _username, password, age, phone, gender }) => {
    const isSigned = await _signUp({ username: _username, password, age, phone, gender, setUserData })

    if (isSigned) {
      setUsername(_username)
      setIsLogged(true)
    }
  }

  const logout = async () => {
    await signOut()
    setUsername('')
    setIsLogged(false)
  }

  return (
    <authContext.Provider value={{ userData, isLogged, username, login, register, logout }}> 
      { children }
    </authContext.Provider>

  )
}

export default AuthContext