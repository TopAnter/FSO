import { BrowserRouter as Router, Link } from 'react-router-dom'
import { NavLink3, MarginCell } from '../styles/styled'

const User = ({ user }) => {
  return (
    <tr>
      <MarginCell>
        <NavLink3 to={`/users/${user.id}`}>{user.name}</NavLink3>
      </MarginCell>
      <MarginCell>{user.blogs.length}</MarginCell>
    </tr>
  )
}

export default User
