import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = ({ setCurrentUser, currentUser, user }) => {
  const [libraries, setLibraries] = useState([])
  const [books, setBooks] = useState([])
  // const [originalBook, setOriginalBook] = useState([])
  const [bookShow, setBookShow] = useState(false)
  let currentLibraries = []
  const getLibraries = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/api/book/userbook/${user.id}`
      )
      result.data.map(({ library }) => {
        currentLibraries.push(library)
      })
      console.log([...new Set(currentLibraries)])
      setLibraries([...new Set(currentLibraries)])
    } catch (error) {
      return error
    }
  }

  const getCurrentUser = async () => {
    const result = await axios.get(
      `http://localhost:3001/api/user/userId/${user.id}`
    )
    console.log(result.data)
    setCurrentUser(result.data)
  }

  const getBooks = async (e) => {
    const result = await axios.get(
      `http://localhost:3001/api/book/library/${user.id}/${e.target.value}`
    )
    console.log(result.data)
    setBooks(result.data)
    setBookShow(true)
  }

  useEffect(() => {
    getLibraries()
    getCurrentUser()
  }, [])

  return (
    <div>
      <div className="profile-user">
        <h2>{currentUser.username}</h2>
        <img src={currentUser.image} />
      </div>
      <div className="library-card">
        {libraries.map((library) => (
          <div key={library}>
            <button value={library} onClick={getBooks}>
              {library}
            </button>
          </div>
        ))}
      </div>
      {bookShow ? (
        <div>
          {books.map((book) => (
            <div key={book.id}>
              <h3>{book.Book.title}</h3>
              <h3>{book.Book.author}</h3>
              <h4>{book.status}</h4>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
export default Profile
