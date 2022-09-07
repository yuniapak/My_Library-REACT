import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
const SearchBookCard = ({ book, user }) => {
  const [existBookId, setExistBookId] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [inLibrary, setInLibrary] = useState(false)
  const [library, setLibrary] = useState('')
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
    setExistBookId(result.data[0].id)
    setLoading(false)
    if (loading === false && existBookId != null) {
      const res = await axios.get(
        `http://localhost:3001/api/review/${existBookId}`
      )
      console.log(res.data)
      setReviews(res.data)
      addBook()
    }
  }

  const addBook = async () => {
    const result = await axios.get(
      `http://localhost:3001/api/book/userbook/book/${user.id}/${existBookId}`
    )
    setInLibrary(true)
    setLibrary(result.data[0].library)
  }
  useEffect(() => {
    getReviews()
  }, [])

  return (
    <div>
      <div className="book-card">
        <h2>{initialState.title}</h2>

        <h3>{initialState.author}</h3>
        <img src={initialState.image} />
        <div>
          {inLibrary ? (
            <h3>In {library}</h3>
          ) : (
            <button onClick={() => {}}>Add to Library</button>
          )}
        </div>
        <p>{initialState.about}</p>
      </div>
      <div>
        {reviews.map((review) => (
          <div key={review.id}>
            <div className="book-card-user">
              <img src={review.User.image} />
              <h3>{review.User.username}</h3>
            </div>
            <h2 className="book-card-h2">{review.comment}</h2>
            <h3>{review.rating}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SearchBookCard
