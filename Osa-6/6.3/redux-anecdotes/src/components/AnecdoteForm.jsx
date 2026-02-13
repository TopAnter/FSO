import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotificationWithTimeout(`you created a new anecdote '${content}'`))
    }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
          <div>
            <input name="content"/>
          </div>
          <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm