import { BrowserRouter as Router, Link } from 'react-router-dom'
import { StyledBlog, NavLink2 } from '../styles/styled'
const Blog = ({ blog, handleLike, handleRemove, userName }) => {
  return (
    <StyledBlog data-testid="blog-item">
      <div>
        <NavLink2 to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </NavLink2>
      </div>
    </StyledBlog>
  )
}

export default Blog
