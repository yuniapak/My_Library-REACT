import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
const SearchBookCard = ({ book }) => {
  const [existBook, setExistBook] = useState()
  const [reviews, setReviews] = useState([])
  let location = useLocation()
  const initialState = {
    id: `${location.state.book.id}`,
    title: `${location.state.book.volumeInfo.title}`,
    author: `${location.state.book.volumeInfo.authors}`,
    image: `${location.state.book.volumeInfo.imageLinks.thumbnail}`,
    about: `${location.state.book.volumeInfo.description}`
  }

  const getReviews = async () => {
    const result = await axios.get(
      `http://localhost:3001/api/book/title/bookTitle?search=${initialState.title}`
    )
    console.log(result.data[0].id)
    setExistBook(result.data[0].id)
    if (existBook !== []) {
      const res = await axios.get(
        `http://localhost:3001/api/review/${existBook}`
      )
      console.log(res.data)
      setReviews(res.data)
    }
  }
  useEffect(() => {
    getReviews()
  }, [])

  return (
    <div>
      <h2>{initialState.title}</h2>
      <h3>{initialState.author}</h3>
      <img src={initialState.image} />
      <p>{initialState.about}</p>
    </div>
  )
}
export default SearchBookCard
