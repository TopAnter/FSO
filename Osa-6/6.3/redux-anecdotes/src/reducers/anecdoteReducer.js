import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    createAnecdote(state, action) {
      state.push(action.payload)
    },

    voteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToUpdate = state.find(a => a.id === id)

      if (anecdoteToUpdate) {
        anecdoteToUpdate.votes = action.payload.votes
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  }
})

const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote1 = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.addVote(anecdote)
    dispatch(voteAnecdote(updated))
  }
}

export default anecdoteSlice.reducer
