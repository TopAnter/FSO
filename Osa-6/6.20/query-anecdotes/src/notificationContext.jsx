import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}

export const useNotificationSetter = () => {
  const [, dispatch] = useNotification()

  return (message) => {
    dispatch({ type: 'SET', payload: message })

    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }
}