import { useState } from "react"
import Note from "./Note"

const Notes = ({notes, handleOnRemoveNote, handleOnModifyNote}) => {
    const [showImportant, setShowImportant] = useState(false)

    const handleOnButtonClick = () => {
        setShowImportant(!showImportant)
    }

    if (!notes) notes = []

    let buttonText
    
    if (!showImportant) {
        buttonText = "Show Only Important"
        
    } else {
        buttonText = "Show All"
        notes = notes.filter(n => n.important === true)
    }

    return (
        <>
            <button onClick={handleOnButtonClick}>{buttonText}</button>
            <ul>
                {notes.map(n => <li key={n.id}><Note note={n} handleOnRemoveNote={handleOnRemoveNote} handleOnModifyNote={handleOnModifyNote}/></li>)}
            </ul>
            
        </>
    )
}

export default Notes
