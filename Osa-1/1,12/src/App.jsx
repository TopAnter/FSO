import { useState } from 'react'
const handleVote = (votes, selected, setVotes) => {
  const newVotes = [...votes]
  newVotes[selected] += 1
  setVotes(newVotes)
}

const App = () => {
  const anecdotes = [
    {text: 'If it hurts, do it more often.', votes: 0},
    {text: 'Adding manpower to a late software project makes it later!', votes: 0},
    {text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {text: 'Premature optimization is the root of all evil.', votes: 0},
    {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.', votes: 0},
    {text: 'The only way to go fast, is to go well.', votes: 0},
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <p>{anecdotes[selected].text}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>next anecdote</button>
      <button onClick={() => handleVote(votes, selected, setVotes)}>vote</button>
      
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))].text}</p>
    </div>
  )
}

export default App