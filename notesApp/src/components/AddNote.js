import { useState } from "react"
import NotesService from "../services/NotesService"

const AddNote = ({handleOnAddNote}) => {
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
        <form onSubmit={handleOnSubmit}>
            <input onChange={handleOnContentChange} type="text" value={content}></input>
            is Important? 
            <input onChange={handleOnImportantChange} type="checkbox"></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddNote