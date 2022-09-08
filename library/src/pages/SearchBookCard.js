import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const SearchBookCard = ({ book, reviews, inLibrary, library, getReviews }) => {
  let navigate = useNavigate()
  let location = useLocation()
  const initialState = {
    id: `${location.state.book.id}`,
    title: `${location.state.book.volumeInfo.title}`,
    author: `${location.state.book.volumeInfo.authors}`,
    image: `${location.state.book.volumeInfo.imageLinks.thumbnail}`,
    about: `${location.state.book.volumeInfo.description}`
  }

  const addBook = async (initialState) => {
    navigate(`bookForm/${initialState.title}`, {
      state: { book: initialState }
    })
  }

  useEffect(() => {
    getReviews(initialState.title)
    // findBook()
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
