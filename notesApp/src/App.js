import React, { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Notification from "./components/Notification";
import NotesService from "./services/NotesService";

const App = () => {
  const [notes, setNotes] = useState([])
  const [message, setMessage] = useState(null)


  const handleOnAddNote = (note) => {
    NotesService.addNote(note)
      .then(data => {
        setNotes(notes.concat(data))
        setMessage("Added new note") 
      })
      .catch(err => setMessage(err.error));
    
  }


  const handleOnRemoveNote = (note) => {
    NotesService.removeNote(note)
    setNotes(notes.filter(n => n.id !== note.id))
    setMessage(`Removed note`)
  }


  const handleOnModifyNote = (note) => {
    NotesService.modifyNote(note)
    setNotes(notes.map(n => n.id === note.id ? note : n))
  }


  useEffect(() => {
    NotesService.getAll().then(data => {
      setNotes(data)
    })
  }, [])


  useEffect(() => {
    const timeout = setTimeout(() => {
        setMessage(null)
    }, 4000)
    return () => {
        clearTimeout(timeout)
    }
  }, [message])

  return (
    <>
      <Notification message={message}/>
      <h2>Add new Note</h2>
      <AddNote handleOnAddNote={handleOnAddNote}/>
      <h1>Notes</h1>
      <Notes notes={notes} handleOnRemoveNote={handleOnRemoveNote} handleOnModifyNote={handleOnModifyNote}/>
    </>
  )
}

export default App;
