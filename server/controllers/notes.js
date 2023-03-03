const notesRouter = require('express').Router()
const Note = require('../models/note')


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})


notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (!note) return res.status(404).send({ error: 'Note not found' })
  res.send(note)
})


notesRouter.put('/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!note) return res.status(404).send({ error: 'Couldnt not find id' })
  res.json(note)
})


notesRouter.post('/', async (req, res) => {
  let note = req.body
  note = new Note({
    content: note.content,
    important: note.important | false
  })
  const savedNote = await note.save()
  res.status(201).json(savedNote)
})


notesRouter.delete('/:id', async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id)
  if (!note) return res.status(404).send({ error: 'Could not find id' })
  res.status(204).end()
})

module.exports = notesRouter