import { createContext, useReducer, useContext, useEffect } from 'react'
import blogService from '../services/blogs'

const userReducer = (state = '', action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return ''
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, '')

  //tarkista onko kukaan kirjautunut
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  return useContext(UserContext).user
}

export const useUserDispatch = () => {
  return useContext(UserContext).userDispatch
}

export default UserContext
