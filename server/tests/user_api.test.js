const bcrypt = require('bcrypt')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./user_helper')
const User = require('../models/user')

beforeAll(async () => {
  await app.connectToDb()
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash: passwordHash
    })

    await user.save()
  })

  test('creation succeds with one username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'My username',
      name: 'My name',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const users = await helper.usersInDb()
    expect(users.length).toBe(usersAtStart.length + 1)
    const usernames = users.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      user: 'root',
      password: 'pwd'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(async () => {
  await User.deleteMany({})
  app.disconnectFromDb()
})