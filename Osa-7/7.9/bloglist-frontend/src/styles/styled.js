import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Page = styled.div`
  background: black;
  padding: 1em;
`

export const Nav = styled.div`
  background: black;
  padding: 1em;
  border: 5px solid white;
  display: flex;
  align-content: center;
`
export const StyledDiv = styled.div`
  background: black;
  color: white;
`

export const StyledBlog = styled.div`
  padding: 1em;
  border: 5px solid white;
  color: white;
`

export const NavLink = styled(Link)`
  background: white;
  padding: 1em;
  border: 5px solid grey;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 20px;
`
export const NavLink2 = styled(Link)`
  padding: 1em;
  text-decoration: none;
  color: white;
  font-weight: bold;
`
export const NavLink3 = styled(Link)`
  padding: 0.2em;
  text-decoration: none;
  color: white;
  font-weight: bold;
  border: 2px solid white;
`

export const StyledLink = styled.a`
  background: black;
  padding: 0.3em;
  border: 5px solid white;
  text-decoration: none;
  color: white;
  font-weight: bold;
`

export const StyledSpan = styled.span`
  color: white;
  padding-left: 1em;
  font-weight: bold;
  font-size: 20px;
`

export const StyledButton = styled.button`
  background: white;
  margin-left: 1em;
  border: 5px solid grey;
  text-decoration: none;
  color: black;
  font-weight: bold;
`

export const StyledInput = styled.input`
  background: white;
  margin-left: 1em;
  border: 5px solid grey;
  text-decoration: none;
  color: black;
  font-weight: bold;
`

export const MarginCell = styled.td`
  padding-bottom: 1em;
`
