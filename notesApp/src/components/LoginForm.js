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
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login