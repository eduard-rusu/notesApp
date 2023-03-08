import React, { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Notification from "./components/Notification";
import Login from "./components/LoginForm";
import notesService from "./services/notesService";
import loginService from "./services/loginService"
import Togglable from "./components/Togglable";

const App = () => {
  const [notes, setNotes] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleOnLogin = async (e) => {
    e.preventDefault();
    console.log('logging in with', username, password)
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      notesService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (ex) {
      setMessage('Wrong credentials')
    }
  }


  const handleUsernameChange = ({ target }) => { setUsername(target.value)}


  const handlePasswordChange = ({ target }) => { setPassword(target.value)}


  const handleOnAddNote = (note) => {
    notesService.addNote(note)
      .then(data => {
        setNotes(notes.concat(data))
        setMessage("Added new note") 
      })
      .catch(err => setMessage(err.error));
    
  }


  const handleOnRemoveNote = (note) => {
    notesService.removeNote(note)
    setNotes(notes.filter(n => n.id !== note.id))
    setMessage(`Removed note`)
  }


  const handleOnModifyNote = (note) => {
    notesService.modifyNote(note)
    setNotes(notes.map(n => n.id === note.id ? note : n))
  }


  useEffect(() => {
    notesService.getAll().then(data => {
      setNotes(data)
    })
    const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
    
    if (user)
      notesService.setToken(user.token)
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


  const loginForm = () => {
    return (
      <Togglable buttonLabel="reveal">
        <Login 
          handleOnLogin={handleOnLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      </Togglable>
    )
  }

  const noteForm = () => (
      <AddNote handleOnAddNote={handleOnAddNote}/>
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
