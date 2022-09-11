import axios from 'axios'
import { useState, useEffect } from 'react'
import BookSearch from '../components/BookSearch'
import UserSearch from '../components/UserSearch'
import Recomend from '../components/Recomend'
import { useNavigate } from 'react-router-dom'
const Search = ({ API_KEY, user }) => {
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
      {searched ? null : (
        <div>
          <Recomend user={user} API_KEY={API_KEY} seeBook={seeBook} />
        </div>
      )}
      <div>
        {searched ? (
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
export default Search
