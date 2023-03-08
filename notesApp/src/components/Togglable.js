import { useState } from "react"

const Togglable = ({ buttonLabel, children}) => {
  const [visible, setVisible] = useState(false)
  
  const hide = { display: visible ? 'none' : ''}
  const show = { display: visible ? '' : 'none'}

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisiblity}>{buttonLabel}</button>
      </div>
      <div style={show}>
        {children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable