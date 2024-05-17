import { useState, useEffect } from "react"
import api from "../api"

const Home = () => {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getNotes()
    }, [])
    
    const getNotes = () => {
        api.get('/api/notes/').then(response => {
            return response.data
        }).then(data => {
            setNotes(data)
            console.log(data);
        }).catch(err => console.log(err))
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then(response => {
            if (response.status === 204) {
                console.log('note deleted');
                getNotes();
            }
            else alert('Failed to delete note.')
        }).catch(err => console.log(err))
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post('/api/notes/', {content, title}).then(response => {
            if(response.status === 201) {
                console.log('Note created');
                getNotes()
            } else {
                alert('Failed to Post')
            }
        }).catch(err => console.log(err);)
    }



    return (<>Home</>)
}

export default Home