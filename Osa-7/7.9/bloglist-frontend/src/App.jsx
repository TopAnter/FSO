import ReactDOM from 'react-dom/client'
import { useState, useRef } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from 'react-router-dom'

//components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import User from './components/User'

//services
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

//reducers
import { useNotificationDispatch } from './contexts/notificationContext'
import { useUserDispatch } from './contexts/userContext'

import { useUserValue } from './contexts/userContext'

//query
import { useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {
  //user usestates
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useUserValue()

  //handle notifications
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  //ref
  const createBlogRef = useRef()

  //query
  const queryClient = useQueryClient()

  const blogResult = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await blogService.getAll()
      return [...response].sort((a, b) => b.likes - a.likes)
    },
  })

  const userResult = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userService.getAll()
      return response
    },
  })

  if (blogResult.isLoading) {
    return <div>loading data...</div>
  }
  const blogs = blogResult.data

  if (userResult.isLoading) {
    return <div>loading data...</div>
  }
  const users = userResult.data

  //login handling
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      //tallenna käyttäjä
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
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
      await blogService.create(BlogObject)

      queryClient.invalidateQueries({ queryKey: ['blogs'] })

      showSuccess(
        `a new blog ${BlogObject.title} by ${BlogObject.author} added`,
      )
    } catch {
      showError('something went wrong')
    }
  }
  //handle liking
  const handleLike = async (blog) => {
    await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })

    queryClient.invalidateQueries({ queryKey: ['blogs'] })
  }

  const handleRemove = async (blog) => {
    try {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)

        queryClient.invalidateQueries({ queryKey: ['blogs'] })

        showSuccess(`a blog ${blog.title} by ${blog.author} deleted`)
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
      <button
        onClick={() => {
          setUsername('mluukkai')
          setPassword('salainen')
          handleLogin
        }}
      >
        quick login
      </button>
    </form>
  )

  //näytä blogit jos kirjautunut
  const showBlogs = () => {
    return blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          userName={user.username}
        />
      ))
  }
  //show users
  const showUsers = () => {
    return users.map((user) => <User key={user.id} user={user} />)
  }

  //logout ominaisuus
  const logout = () => (
    <div>
      {user.name} logged in
      <button
        onClick={() => {
          loginService.logout()
          userDispatch({ type: 'LOGOUT' })
        }}
      >
        logout
      </button>
      <p></p>
    </div>
  )

  //error apufunktiot
  const showSuccess = (text) => {
    notificationDispatch({
      type: 'SET',
      payload: [text, 'success'],
    })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const showError = (text) => {
    notificationDispatch({
      type: 'SET',
      payload: [text, 'error'],
    })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const main = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        {!user && loginForm()}
        {user && logout()}
        {user && (
          <Togglable buttonLabel="create new blog" ref={createBlogRef}>
            <CreateBlog createBlog={handleCreate}></CreateBlog>
          </Togglable>
        )}
        {user && showBlogs()}
      </div>
    )
  }

  const userView = () => (
    <div>
      <h2>blogs</h2>
      {user && logout()}
      <h2>users</h2>
      {showUsers()}
    </div>
  )

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <div>
        <Routes>
          <Route path="/users" element={<userView />} />
          <Route path="/" element={<main />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
