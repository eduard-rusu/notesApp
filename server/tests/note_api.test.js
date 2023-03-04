const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')
const Note = require('../models/note')


beforeEach(async () => {
  await Note.deleteMany({})

  const noteList = helper.initialNotes.map(n => new Note(n))
  for (let note of noteList) {
    await note.save()
  }
})


describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const res = await api.get('/api/notes')
    expect(res.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is whitin the returned notes', async () => {
    const res = await api.get('/api/notes')
    const contents = res.body.map(n => n.content)
    expect(contents).toContain('Browser can execute only JavaScript')
  })
})


describe('viewing a specific note', () => {
  test('succeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]
    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })

  test('fails with status 404 if note does not exist', async () => {
    const validNonexistentId = await helper.nonExistingId()
    await api
      .get(`/api/notes/${validNonexistentId}`)
      .expect(404)
  })

  test('fails with status 400 if id is invalid', async () => {
    await api
      .get('/api/notes/0')
      .expect(400)
  })

})


describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const note = {
      content: 'async/await is easy',
      important: true
    }

    await api
      .post('/api/notes')
      .send(note)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notes = await helper.notesInDb()
    expect(notes).toHaveLength(helper.initialNotes.length + 1)

    const contents = notes.map(n => n.content)
    expect(contents).toContain(note.content)
  })

  test('fails with status code 400 if data invalid', async () => {
    const note = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(note)
      .expect(400)

    const notes = await helper.notesInDb()
    expect(notes).toHaveLength(helper.initialNotes.length)
  })
})




describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]
    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)
    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(notesAtStart.length - 1)

    const contents = notesAtEnd.map(n => n.content)
    expect(contents).not.toContain(noteToDelete.content)

  })
})


afterAll(async () => {
  await mongoose.connection.close()
})