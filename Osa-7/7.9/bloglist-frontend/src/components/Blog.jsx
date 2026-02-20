import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, userName }) => {
  //lisätietojen näyttämisen usestate
  const [showMore, setShowMore] = useState(false)

  //tyylit blogeille
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (showMore === false) {
    return (
      <div style={blogStyle} data-testid="blog-item">
        <div>
          {blog.title} {blog.author}
        </div>
        <button onClick={() => setShowMore(true)}>view</button>
      </div>
    )
  } else if (blog.user.username === userName) {
    return (
      <div style={blogStyle} data-testid="blog-item">
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setShowMore(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes{' '}
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} data-testid="blog-item">
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setShowMore(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes{' '}
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    )
  }
}

export default Blog
