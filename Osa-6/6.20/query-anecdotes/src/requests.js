const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
    
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }
 
  const response = await fetch(baseUrl, options)
 
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
 
  return await response.json()
}

export const addVote = async (newAnecdote) => {

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }
 
  const response = await fetch(`${baseUrl}/${newAnecdote.id}`, options)
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
 
  return await response.json()
}

export default { getAnecdotes, createAnecdote, addVote }