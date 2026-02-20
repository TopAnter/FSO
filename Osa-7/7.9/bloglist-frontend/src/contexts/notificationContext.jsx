import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ['', 'success']
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, [
    '',
    'success',
  ])

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  return useContext(NotificationContext).notification
}

export const useNotificationDispatch = () => {
  return useContext(NotificationContext).notificationDispatch
}

export default NotificationContext
