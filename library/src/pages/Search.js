import axios from 'axios'
import { useState, useEffect } from 'react'
import BookSearch from '../components/BookSearch'

const Search = ({ API_KEY }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [books, setBooks] = useState([])
  const [searched, setSearched] = useState(false)
  const findBooks = async () => {
    let result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}:keyes&key=${API_KEY}
      `
    )
    console.log(result.data)
    // setBooks(result.data)
    // setSearched(true)
    // let bookData = {
    //     title: result.data.volumeInfo,
    //     author: result.data.volumeInfo.authors,
    //     about: result.data.volumeInfo.description,
    //     image: result.data.volumeInfo.imageLinks.thumbnail
    // }
    // let createBook = await axios.post(`http://localhost:3001/api/book`, bookData)
  }
  useEffect =
    (() => {
      findBooks()
    },
    [])
  return (
    <div>
      <BookSearch
        setSearchQuery={setSearchQuery}
        findBooks={findBooks}
        searchQuery={searchQuery}
      />
      <div>
        {searched ? (
          <div>
            {books.map((book) => (
              <div key={book.volumeInfo.authors}>
                <h2>{book.volumeInfo.title}</h2>
                <h2>{book.volumeInfo.authors}</h2>
                <img src={book.volumeInfo.imageLinks.thumbnail} />
                <p>{book.volumeInfo.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
export default Search
