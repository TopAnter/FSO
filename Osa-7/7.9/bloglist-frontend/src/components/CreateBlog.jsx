import { useState } from 'react'
import { StyledButton, StyledInput } from '../styles/styled'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      comments: [],
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>
            title
            <StyledInput
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <StyledInput
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <StyledInput
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
          <p></p>
        </div>
        <StyledButton type="submit">create</StyledButton>
        <br></br>
        <br></br>
        <StyledButton
          type="button"
          onClick={() => {
            setTitle('testi title 1')
            setAuthor('Testaaja kalevala')
            setUrl(
              'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…',
            )
          }}
        >
          quick creation
        </StyledButton>
      </form>
    </div>
  )
}

export default CreateBlog
