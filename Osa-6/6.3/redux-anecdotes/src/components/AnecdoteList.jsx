import { useDispatch, useSelector } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const anecdotesInOrder = anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = id => {
    dispatch(addLike(id))
  }
  

  return (
    <div>

      {anecdotesInOrder.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default AnecdoteList