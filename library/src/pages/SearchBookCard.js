import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import UpdateReview from '../components/UpdateReview.jsx'
import CreateReview from '../components/CreateReview.jsx'
const SearchBookCard = ({ currentUser, user }) => {
  // const [book, setBook] = useState({})
  const [reviews, setReviews] = useState([])
  const [library, setLibrary] = useState('')
  const [inLibrary, setInLibrary] = useState(false)
  const [reviewCard, setReviewCard] = useState(false)
  const [bookId, setBookId] = useState(Number)
  const [hidden, setHidden] = useState(true)
  const [editing, setEditing] = useState(false)
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
  console.log(bookId)
  const getReviews = async (title) => {
    setInLibrary(false)
    //finding book by title
    const result = await axios.get(
      `http://localhost:3001/api/book/title/bookTitle?search=${title}`
    )
    console.log(result.data)
    console.log(result.data[0])
    book = result.data[0]
    console.log(book)
    console.log(book.id)
    //if book exist
    if (book !== {}) {
      console.log('finding reviews')
      console.log(book.id)
      //find review
      const res = await axios.get(`http://localhost:3001/api/review/${book.id}`)
      console.log(res.data)
      setReviews(res.data)
      //finding if book in UserBooks
      setBookId(book.id)
      findBook(book.id)
    }
  }
  const findBook = async (bookID) => {
    //get userbook
    console.log(user.id)
    console.log(bookID)
    const result = await axios.get(
      `http://localhost:3001/api/book/userbook/book/${user.id}/${bookID}`
    )
    console.log(result.data)
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
  const createBook = async () => {
    console.log(initialState)
    console.log(initialState.title)
    const book = {
      title: initialState.title,
      author: initialState.author,
      about: initialState.about,
      image: initialState.image
    }
    const newBook = await axios.post('http://localhost:3001/api/book', book)
    console.log('book created' + book)
    console.log(newBook.data.id)
    setBookId(newBook.data.id)
  }

  const showReviewCard = () => {
    if (bookId == 0) {
      console.log('book created!')
      createBook()
    } else {
      console.log('book exist')
    }
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
  const edit = () => {
    if (editing == false) {
      setEditing(true)
    } else {
      setEditing(false)
      getReviews(initialState.title)
    }
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
          getReviews={getReviews}
        />
      ) : null}
      <div className="all-reviews">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            {review.User.id == user.id ? (
              <div>
                {editing ? (
                  <UpdateReview review={review} edit={edit} />
                ) : (
                  <div className="">
                    <div className="book-card-user">
                      <img src={review.User.image} />
                      <h3>{review.User.username}</h3>
                      <button onClick={edit} className="edit">
                        Edit
                      </button>
                      <button onClick={unhid}>X</button>
                    </div>
                    <div className="text-review">
                      <h2 className="book-card-h2">{review.comment}</h2>
                      <h3>{review.rating}</h3>
                    </div>
                    {hidden ? null : (
                      <div className="search-book-card-banner">
                        <button onClick={unhid} className="delete-btn">
                          X
                        </button>
                        <h3>Are you sure you want to delete your review?</h3>
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="delete-btn"
                        >
                          Yes
                        </button>
                      </div>
                    )}
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
