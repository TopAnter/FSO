import { useState } from 'react'

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
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
        <br></br>
        <br></br>
        <button
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
        </button>
      </form>
    </div>
  )
}

export default CreateBlog
