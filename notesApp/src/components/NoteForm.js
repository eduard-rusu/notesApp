import { useState } from 'react'

const NoteForm = ({ handleOnAddNote }) => {
  const [content, setContent] = useState('')
  const [important, setImportant] = useState(false)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const note = {
      content: content,
      important: important
    }
    handleOnAddNote(note)
    setContent('')
    setImportant(false)
  }


  const handleOnContentChange = (e) => {
    setContent(e.target.value)
  }


  const handleOnImportantChange = (e) => {
    setImportant(e.target.checked)
  }


  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          onChange={handleOnContentChange}
          type='text'
          value={content}
          id='note-input'
        />
        is Important?
        <input
          onChange={handleOnImportantChange}
          type='checkbox'
          checked={important}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default NoteForm