import myFetch from '../wrappers/fetch'

const fetch = myFetch

const getAll = () => {
    return fetch("http://localhost:3001/api/notes").then(res => res.json())
}


const addNote = (note) => {
    let ok = true;
    return fetch(`http://localhost:3001/api/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    .then(res => {
        ok = res.ok;
        return res.json()
    })
    .then(data => ok ? Promise.resolve(data) : Promise.reject(data))
}


const removeNote = (note) => {
    return fetch(`http://localhost:3001/api/notes/${note.id}`, {
        method: 'DELETE'
    })
}


const modifyNote = (note) => {
    return fetch(`http://localhost:3001/api/notes/${note.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
}

export default {
    getAll,
    addNote,
    removeNote,
    modifyNote
}