import { useState } from "react"
import notesService from "../services/notesService"

const AddNote = ({ handleOnAddNote }) => {
  const [content, setContent] = useState('')
  const [important, setImportant] = useState(false)


  const handleOnSubmit = (e) => {
      e.preventDefault()
      const note = {
          content: content,
          important: important
      }
      handleOnAddNote(note)
      setContent('');
  }


  const handleOnContentChange = (e) => {
      setContent(e.target.value)
  }


  const handleOnImportantChange = (e) => {
      setImportant(e.target.checked)
  }

  
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={handleOnSubmit}>
        <input 
          onChange={handleOnContentChange} 
          type="text" 
          value={content}
        />
        is Important? 
        <input 
          onChange={handleOnImportantChange} 
          type="checkbox"
        />
        <button type="submit">Add</button>
      </form>
    </div>  
  )
}

export default AddNote