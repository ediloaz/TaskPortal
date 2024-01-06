import { useState, useEffect } from 'react'

import { AuthContext as authContext } from 'context/authContext'

import { signIn as _signIn, signUp as _signUp, checkSignIn, signOut, getUsernameCookie } from 'helpers/auth'

const AuthContext = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true)
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState({})
  const [offlineMode, setOfflineMode] = useState(false)
  const [serverConnection, setServerConnection] = useState(true)
  
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
    try {
      const isSigned = await checkSignIn({ username: _username, setUserData })

      if (isSigned) {
        setUsername(_username)
        setIsLogged(true)
      }else{
        setIsLogged(false)
      }
    }catch (e) {
      console.log('Error to connect to server', e)
      setServerConnection(false)
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

  const useOfflineMode = () => {
    setUsername('Offline User')
    setUserData({
      username: 'Offline User',
      age: '50 - *',
      phone: '8888-8888',
      gender: 'Prefer not to say',
    })
    setIsLogged(true)
    setOfflineMode(true)
  }

  return (
    <authContext.Provider value={{ userData, isLogged, username, login, register, logout, serverConnection, useOfflineMode, offlineMode }}> 
      { children }
    </authContext.Provider>

  )
}

export default AuthContext