import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import UpdateReview from '../components/UpdateReview.jsx'
import CreateReview from '../components/CreateReview.jsx'
const BookCard = ({ user }) => {
  let location = useLocation()
  const [reviews, setReviews] = useState([])
  const [firstReview, setFirstReview] = useState({})
  const [reviewCard, setReviewCard] = useState(false)
  const [bookId, setBookId] = useState(Number)
  const [hidden, setHidden] = useState(true)
  const [editing, setEditing] = useState(false)
  const initialState = {
    id: `${location.state.book.id}`,
    userId: `${location.state.book.userId}`,
    title: `${location.state.book.Book.title}`,
    image: `${location.state.book.Book.image}`,
    author: `${location.state.book.Book.author}`,
    about: `${location.state.book.Book.about}`,
    status: `${location.state.book.status}`,
    bookId: `${location.state.book.Book.id}`
  }

  const getReviews = async () => {
    const result = await axios.get(
      `http://localhost:3001/api/review/${initialState.bookId}`
    )
    setBookId(initialState.bookId)
    setReviews(result.data)
    reviews.map((review) => {
      if (review.userId == initialState.userId) {
        console.log(review)
        setFirstReview(review)
      }
    })
  }
  const showReviewCard = () => {
    if (reviewCard == false) {
      setReviewCard(true)
    } else {
      getReviews()
    }
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
    console.log('deleted')
    getReviews()
    setHidden(true)
  }

  const edit = () => {
    if (editing == false) {
      setEditing(true)
    } else {
      setEditing(false)
      getReviews()
    }
  }

  useEffect(() => {
    getReviews()
  }, [])

  return (
    <div>
      <div className="book-card">
        <img src={initialState.image} />
        <h2>{initialState.title}</h2>
        <h2>{initialState.author}</h2>
        <h3>{initialState.status}</h3>
        <p>{initialState.about}</p>
        <button onClick={showReviewCard}>Review</button>
      </div>
      {/* <UpdateReview /> */}
      {reviewCard ? (
        <CreateReview
          bookId={bookId}
          initialState={initialState}
          user={user}
          getReviews={getReviews}
          showReviewCard={showReviewCard}
          setReviewCard={setReviewCard}
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
                  <div>
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
                      <h3 className="book-card-h3">{review.rating}</h3>
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
export default BookCard
