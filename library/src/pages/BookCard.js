import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
const BookCard = () => {
  let location = useLocation()
  const [reviews, setReviews] = useState([])
  const [firstReview, setFirstReview] = useState([])
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
        setFirstReview(review)
      }
    })
  }
  useEffect(() => {
    getReviews()
  }, [])

  return (
    <div>
      <div>
        <img src={initialState.image} />
        <h2>{initialState.title}</h2>
        <h2>{initialState.author}</h2>
        <h3>{initialState.status}</h3>
        <p>{initialState.about}</p>
      </div>
      <div>
        {firstReview == [] ? (
          <div>
            {firstReview.map((userReview) => (
              <div key={userReview.id}>
                <h2>{userReview.comment}</h2>
                <h3>{userReview.rating}</h3>
              </div>
            ))}
          </div>
        ) : null}
        <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <h3>{review.User.username}</h3>
              <img src={review.User.image} />
              <h2>{review.comment}</h2>
              <h3>{review.rating}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default BookCard
