import axios from 'axios'
import { useState, useEffect } from 'react'
import BookSearch from '../components/BookSearch'
import UserSearch from '../components/UserSearch'
import { useNavigate } from 'react-router-dom'
const Search = ({ API_KEY }) => {
  let navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchUserQuery, setSearchUserQuery] = useState('')
  const [searchedUser, setSearchedUser] = useState([])
  const [books, setBooks] = useState([])
  const [searched, setSearched] = useState(false)

  const findBooks = async () => {
    let result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&printType=books&key=${API_KEY}   `
    )
    console.log(result.data.items)
    setBooks(result.data.items)
    setSearched(true)
    //   let bookData = {
    //       title: result.data.volumeInfo,
    //       author: result.data.volumeInfo.authors,
    //       about: result.data.volumeInfo.description,
    //       image: result.data.volumeInfo.imageLinks.thumbnail
    //   }
    //   let createBook = await axios.post(`http://localhost:3001/api/book`, bookData)
    // }
    //   useEffect(() => {
    //       findBooks()
    //     },
    //     [])
  }
  const findUser = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/user/${searchUserQuery}`
    )
    console.log(res.data)
    setSearchedUser(res.data)
  }
  const seeBook = (book) => {
    navigate(`book/${book.id}`, { state: { book: book } })
  }

  return (
    <div>
      <BookSearch
        setSearchQuery={setSearchQuery}
        findBooks={findBooks}
        searchQuery={searchQuery}
        searched={searched}
        books={books}
      />
      <UserSearch
        setSearchUserQuery={setSearchUserQuery}
        searchUserQuery={searchUserQuery}
        findUser={findUser}
        searchedUser={searchedUser}
      />
      <div>
        {searched ? (
          <div className="search-books">
            {books.map((book) => (
              <div
                key={book.volumeInfo.authors}
                className="search-book"
                onClick={() => seeBook(book)}
              >
                <h2>{book.volumeInfo.title}</h2>
                <h2>{book.volumeInfo.authors}</h2>
                <img src={book.volumeInfo.imageLinks.thumbnail} />
                {/* <p>{book.volumeInfo.description}</p> */}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default Search
