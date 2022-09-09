import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = ({
  loading,
  user,
  // following,
  // followers,
  // getFollowing,
  // getFollowers,
  currentUser
  // loadingFinished
}) => {
  let navigate = useNavigate()
  const [libraries, setLibraries] = useState([])
  const [books, setBooks] = useState([])
  const [bookShow, setBookShow] = useState(false)
  const [bookUser, setBookUser] = useState({})
  const [followerLoading, setFollowerLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({})
  const [following, setFollowing] = useState('')
  const [followers, setFollowers] = useState('')
  let currentLibraries = []

  console.log(currentUser)
  // console.log(bookUser)

  const getLibraries = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3001/api/book/userbook/${currentUser.id}`
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
      `http://localhost:3001/api/user/userId/${currentUser.id}`
    )
    console.log(result.data)
    setUserInfo(result.data)
    setFollowerLoading(false)
  }

  const getBooks = async (e) => {
    const result = await axios.get(
      `http://localhost:3001/api/book/library/${currentUser.id}/${e.target.value}`
    )
    console.log(result.data)
    setBooks(result.data)
    setBookShow(true)
  }

  const seeBook = (book) => {
    navigate(`book/${book.id}`, { state: { book: book } })
  }

  const getFollowing = async (id) => {
    const result = await axios.get(
      `http://localhost:3001/api/user/following/${id}`
    )
    console.log(id)
    console.log(result.data)
    let followingCount = ' ' + result.data.length
    setFollowing(followingCount)
    console.log('followers got')
  }

  const getFollowers = async (id) => {
    const res = await axios.get(
      `http://localhost:3001/api/user/followers/${id}`
    )
    console.log(id)
    console.log('following got')
    setFollowers(res.data.length)
  }

  useEffect(() => {
    // setBookUser(user)
    if (!loading) {
      getCurrentUser()
      // if (!followerLoading) {
      console.log('getting followers')
      getFollowing(currentUser.id)
      getFollowers(currentUser.id)
      // }
    }
  }, [])
  if (loading && followerLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  } else {
    console.log(currentUser)
    return (
      <div className="profile">
        <div className="profile-user">
          <img src={userInfo.image} />

          <div className="profile-user-follow">
            <h2>{userInfo.username}</h2>
            {/* {followerLoading ? ( */}
            <div>
              <h3>Following: {following}</h3>
              <h3>Followers: {followers}</h3>
            </div>
            {/* ) : (
              <h3>loading...</h3>
            )} */}
          </div>
        </div>
        <button onClick={getLibraries}>See Libraries</button>
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
}
export default Profile
