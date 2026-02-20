import { useNotificationValue } from '../contexts/notificationContext'
const Notification = () => {
  const notification = useNotificationValue()
  const message = notification[0]
  const type = notification[1]
  if (message === '') return null

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    border: 'solid',
    padding: 10,
    marginBottom: 10,
  }

  return <div style={style}>{message}</div>
}

export default Notification
