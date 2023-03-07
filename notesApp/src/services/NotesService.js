let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
    return fetch("http://localhost:3001/api/notes").then(res => res.json())
}


const addNote = async (note) => {
    const res = await fetch(`http://localhost:3001/api/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(note)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data)
    return data
}


const removeNote = async (note) => {
    const res = await fetch(`http://localhost:3001/api/notes/${note.id}`, {
        method: 'DELETE'
    })
    return res
}


const modifyNote = async (note) => {
    const res = await fetch(`http://localhost:3001/api/notes/${note.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    return res
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    addNote,
    removeNote,
    modifyNote,
    setToken
}