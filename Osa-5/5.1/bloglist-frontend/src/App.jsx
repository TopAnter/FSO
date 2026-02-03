import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'

//services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  //user usestates
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  //blogCreating usestates
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [updateBlogs, setUpdateBlogs] = useState(0)

  //handle messages
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  //hanki blogit
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [updateBlogs])

  //tarkista onko kukaan kirjautunut
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //login handling
  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      //tallenna käyttäjä
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      showSuccess(`${user.name} logged in`)
    } catch {
        showError('wrong username or password')
    }
  }

  //blog creation handling
  const handleCreate = async event => {
    event.preventDefault()

    try {
      await blogService.create({ title, author, url })

      showSuccess(`a new blog ${title} by ${user.name} added`)

      setTitle('')
      setAuthor('')
      setUrl('')

      if (updateBlogs === 0) {
        setUpdateBlogs(updateBlogs + 1)
      }else {
        setUpdateBlogs(updateBlogs - 1)
      }
    } catch {
      showError('something went wrong')
    }
  }

  //login form
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
      <br></br>
      <br></br>
      <button onClick={() => {
        setUsername('mluukkai') 
        setPassword('salainen') 
        handleLogin
        }}>quick login</button>
    </form>
  )

  //create blog form
  const createBlog = () => (
    <form onSubmit={handleCreate}>
      <div>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
      <br></br>
      <br></br>
      <button onClick={() => {
        setTitle('testi title 1') 
        setAuthor('Testaaja kalevala')
        setUrl('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…')
        handleCreate
        }}>quick creation</button>
    </form>
  )

  //näytä blogit jos kirjautunut
  const showBlogs = () => {
    return blogs
    .filter(blog => blog.user?.username === user.username)
    .map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  }
  //logout ominaisuus
  const logout = () => (
    <div>
      {user.name} logged in
      <button onClick={() => {
        loginService.logout()
        setUser(null)
      }}>logout</button>
      <p></p>
    </div>
  )

  //error apufunktiot
  const showSuccess = (text) => {
    setMessage(text)
    setMessageType('success')
    setTimeout(() => setMessage(null), 5000)
  }

  const showError = (text) => {
    setMessage(text)
    setMessageType('error')
    setTimeout(() => setMessage(null), 5000)
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      {!user && loginForm()}

      {user && logout()}
      {user && createBlog()}
      {user && showBlogs()}
    </div>
  )
}

export default App