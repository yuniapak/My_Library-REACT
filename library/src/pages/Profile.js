import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = ({ setCurrentUser, currentUser, user }) => {
  let navigate = useNavigate()
  const [libraries, setLibraries] = useState([])
  const [books, setBooks] = useState([])
  const [bookShow, setBookShow] = useState(false)
  const [following, setFollowing] = useState('')
  const [followers, setFollowers] = useState('')
  let currentLibraries = []
  let followingCount = Number

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

  const GetFollowing = async () => {
    const result = await axios.get(
      `http://localhost:3001/api/user/following/${user.id}`
    )
    console.log(result.data)
    let followingCount = ' ' + result.data.length
    setFollowing(followingCount)
  }

  const GetFollowers = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/user/followers/${user.id}`
    )
    console.log(res.data.length)
    setFollowers(res.data.length)
  }

  const getBooks = async (e) => {
    const result = await axios.get(
      `http://localhost:3001/api/book/library/${user.id}/${e.target.value}`
    )
    console.log(result.data)
    setBooks(result.data)
    setBookShow(true)
  }

  const seeBook = (book) => {
    navigate(`book/${book.id}`, { state: { book: book } })
  }

  useEffect(() => {
    getLibraries()
    getCurrentUser()
    GetFollowing()
    GetFollowers()
  }, [])

  return (
    <div>
      <div className="profile-user">
        <img src={currentUser.image} />

        <div className="profile-user-follow">
          <h2>{currentUser.username}</h2>
          <h3>Following: {following}</h3>
          <h3>Followers: {followers}</h3>
        </div>
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
        <div className="profile-books">
          {books.map((book) => (
            <div
              key={book.id}
              className="profile-books-book"
              onClick={() => seeBook(book)}
            >
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
