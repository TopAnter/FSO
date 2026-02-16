import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote1 } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content
      .toLowerCase()
      .includes(filter.toLowerCase())
  )

  const anecdotesInOrder = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  const vote = anecdote => {
    dispatch(voteAnecdote1(anecdote))
    dispatch(setNotificationWithTimeout(`you voted '${(anecdote).content}'`, 5))
  }
  

  return (
    <div>

      {anecdotesInOrder.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            votes: {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default AnecdoteList