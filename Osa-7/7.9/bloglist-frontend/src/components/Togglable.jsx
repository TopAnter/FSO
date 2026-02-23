import { useState, useImperativeHandle } from 'react'
import { StyledButton } from '../styles/styled'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <StyledButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </StyledButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <StyledButton onClick={toggleVisibility}>cancel</StyledButton>
      </div>
    </div>
  )
}

export default Togglable
