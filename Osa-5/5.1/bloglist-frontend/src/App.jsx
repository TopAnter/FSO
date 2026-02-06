import { useState, useEffect, useRef } from 'react'

//components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'

//services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  //user usestates
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  //handle messages
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  //ref
  const createBlogRef = useRef()

  //hanki blogit
  useEffect(() => {
    blogService.getAll().then(blogs =>{
      const sorted = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sorted)
  })  
  }, [])

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
  const handleCreate = async (BlogObject) => {
    try {
      createBlogRef.current.toggleVisibility()
      const newBlog = await blogService.create(BlogObject)

      setBlogs(prev =>
        [...prev, newBlog].sort((a, b) => b.likes - a.likes)
      )

      showSuccess(`a new blog ${BlogObject.title} by ${user.name} added`)
    } catch {
      showError('something went wrong')
    }
  }
  //handle liking
  const handleLike = async (blog) => {

  const updated = await blogService.update(blog.id, {
    ...blog,
    likes: blog.likes + 1
  })
  

  const newBlogs = blogs.map(b =>
    b.id === updated.id ? updated : b
  )

  setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }

  const handleRemove = async (blog) => {
    try {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
        showSuccess(`a blog ${blog.title} by ${user.name} deleted`)
      }
    } catch {
      showError('something went wrong')
  }}

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


  //näytä blogit jos kirjautunut
  const showBlogs = () => {
    return blogs
    .filter(blog => blog.user?.username === user.username)
    .map(blog =>
      <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>
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
      {user && (
        <Togglable buttonLabel="create new blog" ref={createBlogRef}>
          <CreateBlog
            createBlog={handleCreate}
          >
          </CreateBlog>
        </Togglable>)}
      {user && showBlogs()}
    </div>
  )
}

export default App