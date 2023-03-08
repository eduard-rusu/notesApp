import NotesService from "../services/notesService"

const Note = ({note, handleOnRemoveNote, handleOnModifyNote}) => {
    const handleOnDelete = () => {
        handleOnRemoveNote(note)
    }

    const handleOnModify = () => {
        note.important = !note.important
        handleOnModifyNote(note)
    }

    let important = 'Make Important'
    if (note.important === true) important = 'Make Unimportant'
    
    return (
        <>
            <div>{note.content}</div>
            <button onClick={handleOnDelete} type="text">Delete</button>
            <button onClick={handleOnModify} type="text">{important}</button>
        </>
    )
}

export default Note