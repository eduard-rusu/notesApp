const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Note = require('../models/note')


beforeEach(async () => {
  await Note.deleteMany({})

  const noteList = helper.initialNotes.map(n => new Note(n))
  for (let note of noteList) {
    await note.save()
  }
})

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 15000)

test('all notes are returned', async () => {
  const res = await api.get('/api/notes')
  expect(res.body).toHaveLength(helper.initialNotes.length)
}, 15000)

test('a specific note is whitin the returned notes', async () => {
  const res = await api.get('/api/notes')
  const contents = res.body.map(n => n.content)
  expect(contents).toContain('Browser can execute only JavaScript')
}, 15000)

test('a valid note can be added', async () => {
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

test('note without content is not added', async () => {
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

test('a specific note can be viewd', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]
  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultNote.body).toEqual(noteToView)
})

test('a note can be deleted', async () => {
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

afterAll(async () => {
  await mongoose.connection.close()
})