import { useState } from 'react'

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
            <input
              type="text"
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CreateComment
