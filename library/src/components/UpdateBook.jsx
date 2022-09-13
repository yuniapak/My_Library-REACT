import axios from 'axios'
import { useState, useEffect} from 'react'

const UpdateBook =({user, initialState, setUpdating})=>{
    const[libraries, setLibraries]= useState([])
    const [bookForm, setBookForm]=useState({
        userId: user.id,
        bookId: initialState.bookId,
        status: '',
        library: ''
    })
    const[newLibrary, setNewLibrary]=useState('')
    let currentLibraries = []
    const getLibraries = async () => {
        try {
          const result = await axios.get(
            `http://localhost:3001/api/book/userbook/${user.id}`
          )
          result.data.map(({ library }) => {
            currentLibraries.push(library)
          })
          setLibraries([...new Set(currentLibraries)].map((library)=>({label: library, value:library})))
        } catch (error) {
          return error
        }
      }
    const updateBook =async(form)=>{
        let res = await axios.put(`http://localhost:3001/api/book/userbook/${initialState.id}`, form)
        console.log(res.data)
    }
    const handleChange = (event) => {
        setBookForm({ ...bookForm, [event.target.name]: event.target.value })
        console.log(bookForm)
        console.log(event.target.value)
        if(event.target.value === 'new'){
        setNewLibrary('new')
        }
      }
    const handleSubmit = async (e) => {
      e.preventDefault()
      await updateBook(bookForm)
      console.log(bookForm)
      setBookForm({
        status: '',
        library: ''
      })
      console.log('book changed')
      setUpdating(false)

    }
    useEffect(()=>{
    getLibraries()
    },[])
    return(
        <div className='bookEdit'><form className='bookEdit-form' onSubmit={handleSubmit}>
            <select
                        id="value"
                        name="status"
                        onChange={handleChange}
                        value={bookForm.status}
                        className='bookEdit-select'>

            <option value={initialState.status}>
              {initialState.status}
            </option>
            <option value="about to read">About to read</option>
            <option value="Reading">Reading</option>
            <option value="Read">Read</option>
            </select>
            <select                        
            id="value"
            name="library"
            onChange={handleChange}
            value={bookForm.library}
            className='bookEdit-select'>
                <option value={initialState.library}>{initialState.library}</option>
                {libraries.map(({value,label})=>(
                    <option value={value}>{label}</option>
                ))}
                <option value='new' >newLibrary</option>
            </select>
            { newLibrary=== 'new' ? 
            (<input
            className='bookEdit-input'
            maxLength="100"
            onChange={handleChange}
            name="library"
            type="text"
            placeholder="Library name"
            value={bookForm.library}
            contentEditable="true"
            required></input>) : (null)}
            <button type="submit" className='bookEdit-button'>Send</button>
            </form></div>
    )
}
export default UpdateBook