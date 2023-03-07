import React, { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Notification from "./components/Notification";
import NotesService from "./services/NotesService";
import loginSrvice from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('logging in with', username, password)
    
    try {
      const user = await loginSrvice.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      NotesService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (ex) {
      setMessage('Wrong credentials')
    }
  }


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
    const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
    
    if (user)
      NotesService.setToken(user.token)
      setUser(user)
  }, [])


  useEffect(() => {
    const timeout = setTimeout(() => {
        setMessage(null)
    }, 4000)
    return () => {
        clearTimeout(timeout)
    }
  }, [message])


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target })=>setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target })=>setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const noteForm = () => (
    <>
      <h2>Add new Note</h2>
      <AddNote handleOnAddNote={handleOnAddNote}/>
    </> 
  )

  return (
    <>
      <Notification message={message}/>

      {user === null && loginForm()}
      {user !== null && noteForm()}

      <h1>Notes</h1>
      <Notes notes={notes} handleOnRemoveNote={handleOnRemoveNote} handleOnModifyNote={handleOnModifyNote}/>
    </>
  )
}

export default App;
