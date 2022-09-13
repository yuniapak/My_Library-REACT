import axios from 'axios'
import { useState, useEffect } from 'react'
import BookSearch from '../components/BookSearch'
import UserSearch from '../components/UserSearch'
import Recomend from '../components/Recomend'
import { useNavigate } from 'react-router-dom'
const Search = ({ API_KEY, user, authenticated }) => {
  let navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchUserQuery, setSearchUserQuery] = useState('')
  const [userSearch, setUserSearch] = useState(false)
  const [bookSearch, setBookSearch] = useState(true)
  const [searchedUser, setSearchedUser] = useState([])
  const [currentFunction, setCurrentFunction] = useState('')
  const [books, setBooks] = useState([])
  const [searched, setSearched] = useState(false)

  const findBooks = async () => {
    let result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&printType=books&key=${API_KEY}   `
    )
    console.log(result.data.items)
    setBooks(result.data.items)
    setSearched(true)
    setUserSearch(false)
  }
  const findUser = async () => {
    const res = await axios.get(
      `https://librarydb.fly.dev/api/user/${searchQuery}`
    )
    console.log(res.data)
    setSearchedUser(res.data)
    setSearched(false)
    setUserSearch(true)
  }
  const handleChange = (event) => {
    let input = event.target.value
    setSearchQuery(input)
  }

  const seeBook = (book) => {
    navigate(`book/${book.id}`, { state: { book: book } })
  }
  const orBook = () => {
    setBookSearch(true)
    setUserSearch(false)
    setCurrentFunction(findBooks())
  }
  const orUser = () => {
    setBookSearch(false)
    setUserSearch(true)
    setCurrentFunction(findUser())
  }

  let authenticatedOption
  if (user) {
    authenticatedOption = (
      <div>
        <div className="search">
          <input
            type="text"
            name="search"
            value={searchQuery}
            placeholder="Book Title"
            onChange={handleChange}
            className="search-input"
          ></input>
        </div>
        <div className="search-tag">
          <h3 onClick={orBook}>Books</h3>
          <h3 onClick={orUser}>User</h3>
        </div>
        <UserSearch searchedUser={searchedUser} userSearch={userSearch} />
        {searched ? null : (
          <div>
            <Recomend user={user} API_KEY={API_KEY} seeBook={seeBook} />
          </div>
        )}
        <div>
          {searched && bookSearch ? (
            <div className="search-elements">
              {books.map((book) => (
                <div
                  key={book.volumeInfo.authors}
                  className="element"
                  onClick={() => seeBook(book)}
                >
                  <h2>{book.volumeInfo.title}</h2>
                  <h2>{book.volumeInfo.authors}</h2>
                  {book.volumeInfo.imageLinks == undefined ? null : (
                    <img src={book.volumeInfo.imageLinks.thumbnail} />
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
  const publicOption = (
    <div>
      <div className="search">
        <input
          type="text"
          name="search"
          value={searchQuery}
          placeholder="Book Title"
          onChange={handleChange}
          className="search-input"
        ></input>
      </div>
      <div className="search-tag">
        <h3 onClick={orBook}>Books</h3>
      </div>
      <div>
        {searched && bookSearch ? (
          <div className="search-elements">
            {books.map((book) => (
              <div
                key={book.volumeInfo.authors}
                className="element"
                onClick={() => seeBook(book)}
              >
                <h2>{book.volumeInfo.title}</h2>
                <h2>{book.volumeInfo.authors}</h2>
                {book.volumeInfo.imageLinks == undefined ? null : (
                  <img src={book.volumeInfo.imageLinks.thumbnail} />
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )

  return <div>{authenticated && user ? authenticatedOption : publicOption}</div>
}
export default Search
