import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CreateReview from '../components/CreateReview.jsx'
const SearchBookCard = ({ currentUser, user }) => {
  // const [book, setBook] = useState({})
  const [reviews, setReviews] = useState([])
  const [library, setLibrary] = useState('')
  const [inLibrary, setInLibrary] = useState(false)
  const [reviewCard, setReviewCard] = useState(false)
  const [bookId, setBookId] = useState(Number)
  const [hidden, setHidden] = useState(true)
  let navigate = useNavigate()
  let location = useLocation()
  let book = {}
  const initialState = {
    id: `${location.state.book.id}`,
    title: `${location.state.book.volumeInfo.title}`,
    author: `${location.state.book.volumeInfo.authors}`,
    image: `${location.state.book.volumeInfo.imageLinks.thumbnail}`,
    about: `${location.state.book.volumeInfo.description}`
  }
  console.log(currentUser)
  const getReviews = async (title) => {
    setInLibrary(false)
    const result = await axios.get(
      `http://localhost:3001/api/book/title/bookTitle?search=${title}`
    )
    console.log(result.data)
    console.log(result.data[0])
    book = result.data[0]
    console.log(book)
    console.log(book.id)
    if (book !== {}) {
      console.log('finding reviews')
      console.log(book.id)
      const res = await axios.get(`http://localhost:3001/api/review/${book.id}`)
      console.log(res.data)
      setReviews(res.data)
      findBook(book.id)
      setBookId(book.id)
    }
  }
  const findBook = async (bookId) => {
    const result = await axios.get(
      `http://localhost:3001/api/book/userbook/book/${currentUser.id}/${bookId}`
    )
    setLibrary(result.data[0].library)
    if (setLibrary == []) {
      console.log('not in library')
    } else {
      console.log('finding Book')
      setInLibrary(true)
      console.log(result.data)
    }
  }

  const addBook = async (initialState) => {
    navigate(`bookForm/${initialState.title}`, {
      state: { book: initialState }
    })
  }
  const showReviewCard = () => {
    setReviewCard(true)
  }

  const unhid = () => {
    if (hidden == true) {
      setHidden(false)
    } else {
      setHidden(true)
    }
  }
  const deleteReview = async (id) => {
    await axios.delete(`http://localhost:3001/api/review/${id}`)
  }

  useEffect(() => {
    getReviews(initialState.title)
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
            <button
              onClick={() => {
                addBook(initialState)
              }}
            >
              Add to Library
            </button>
          )}
          <button onClick={showReviewCard}>Review</button>
        </div>
        <p>{initialState.about}</p>
      </div>
      {reviewCard ? (
        <CreateReview
          bookId={bookId}
          currentUser={currentUser}
          initialState={initialState}
          user={user}
        />
      ) : null}
      <div>
        {reviews.map((review) => (
          <div key={review.id}>
            {review.User.id == user.id ? (
              <div>
                <div className="book-card-user">
                  <img src={review.User.image} />
                  <h3>{review.User.username}</h3>
                  <button onClick={unhid}>X</button>
                  <button onClick={edit}>Edit</button>
                </div>
                <h2 className="book-card-h2">{review.comment}</h2>
                <h3>{review.rating}</h3>
                {hidden ? null : (
                  <div className="search-book-card-banner">
                    <button onClick={unhid}>X</button>
                    <h3>Are you sure you want to delete your review?</h3>
                    <button onClick={() => deleteReview(review.id)}>Yes</button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="book-card-user">
                  <img src={review.User.image} />
                  <h3>{review.User.username}</h3>
                </div>
                <h2 className="book-card-h2">{review.comment}</h2>
                <h3>{review.rating}</h3>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default SearchBookCard
