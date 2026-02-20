import { BrowserRouter as Router, Link } from 'react-router-dom'
const Blog = ({ blog, handleLike, handleRemove, userName }) => {
  //tyylit blogeille
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} data-testid="blog-item">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

export default Blog
