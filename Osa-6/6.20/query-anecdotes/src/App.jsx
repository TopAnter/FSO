import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addVote } from './requests'
import { useNotificationSetter } from './notificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationSetter()
  const newVoteMutation = useMutation({

    mutationFn: addVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

    },
  })
  const handleVote = (anecdote) => {
    newVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: () => {
          setNotification(`you voted '${anecdote.content}'`)
        }
      }
    )
  }

  const { status, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
 
  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = data
  

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
