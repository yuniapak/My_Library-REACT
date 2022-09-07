import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
const BookCard = () => {
  let location = useLocation()
  const [reviews, setReviews] = useState([])
  const [firstReview, setFirstReview] = useState({})
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
    setReviews(result.data)
    reviews.map((review) => {
      if (review.userId == initialState.userId) {
        console.log(review)
        setFirstReview(review)
      }
    })
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
      </div>
      <div className="book-card-first-review">
        {/* {firstReview == {} ? null : (
          <div>
            <div className="book-card-user">
              <h3>{firstReview.User.username}</h3>
              <img src={firstReview.User.image} />
            </div>
            <h2>{firstReview.comment}</h2>
            <h3>{firstReview.rating}</h3>
          </div>
        )} */}
        <div className="book-card-reviews">
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
    </div>
  )
}
export default BookCard
