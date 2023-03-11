const login = async (credentials) => {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  }
  const res = await fetch('http://localhost:3001/api/login', opts)

  if (!res.ok) throw new Error(await res.json())

  return await res.json()
}

export default { login }