import PropTypes from 'prop-types'

const Login = ({
  handleOnLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleOnLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

Login.propTypes = {
  handleOnLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login