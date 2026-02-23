import { useState } from 'react'
import { StyledButton, StyledInput } from '../styles/styled'

const CreateComment = ({ createComment, blogId }) => {
  const [commentInput, setCommentInput] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    createComment({
      comment: commentInput,
      blogId: blogId,
    })

    setCommentInput('')
  }

  return (
    <div>
      <h2>Create a new comment</h2>

      <form onSubmit={addComment}>
        <div>
          <label>
            comment
            <StyledInput
              type="text"
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
            />
          </label>
        </div>
        <StyledButton type="submit">add comment</StyledButton>
      </form>
    </div>
  )
}

export default CreateComment
