import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
const BookForm = ({ book, user }) => {
  let navigate = useNavigate()
  let location = useLocation()
  const [matchBook, setMatchBook] = useState({})

  const [userBook, setUserBook] = useState({
    status: '',
    library: ''
  })
  const initialState = {
    id: `${location.state.book.id}`,
    title: `${location.state.book.title}`,
    author: `${location.state.book.author}`,
    image: `${location.state.book.image}`,
    about: `${location.state.book.about}`
  }

  const createBook = async () => {
    //find book if exist by title
    const result = await axios.get(
      `http://localhost:3001/api/book/title/bookTitle?search=${initialState.title}`
    )
    console.log(result.data)
    setMatchBook(result.data[0])
    //if length of array is 0 book does not exist
    if (!result.data.length) {
      //creating new book for db
      const book = {
        title: initialState.title,
        author: initialState.author,
        about: initialState.about,
        image: initialState.image
      }
      const newBook = await axios.post('http://localhost:3001/api/book', book)
      console.log('book created' + book)
      setMatchBook(newBook.data)
    } else {
      console.log('book exist in db')
    }
  }
  useEffect(() => {
    createBook()
  }, [])
  //creating UserBook
  const handleChange = (event) => {
    setUserBook({ ...userBook, [event.target.name]: event.target.value })
    console.log(userBook)
  }
  const addUserBook = async (book) => {
    const result = await axios.post(
      `http://localhost:3001/api/book/userbook/${user.id}/${matchBook.id}`,
      book
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await addUserBook(userBook)
    console.log(userBook)
    setUserBook({
      status: '',
      library: ''
    })
    console.log('UserBook created')
    navigate(`/search`)
  }

  return (
    <div>
      <div className="create-book-card">
        <img src={initialState.image} />
        <h2>{initialState.title}</h2>
        <h3>{initialState.author}</h3>
      </div>
      <div className="book-card-form">
        <form onSubmit={handleSubmit}>
          <select
            id="value"
            name="status"
            onChange={handleChange}
            value={userBook.status}
          >
            <option value="" disabled>
              Reading?
            </option>
            <option value="about to read">About to read</option>
            <option value="Reading">Reading</option>
            <option value="Read">Read</option>
          </select>
          <h3>Choose Library:</h3>
          <input
            maxLength="100"
            onChange={handleChange}
            name="library"
            type="text"
            placeholder="Library name"
            value={userBook.library}
            required
          />
          <button
            type="submit"
            disabled={userBook.status == '' && !userBook.library}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}
export default BookForm
