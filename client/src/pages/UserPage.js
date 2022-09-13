import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
const UserPage = ({
  user,
  following,
  followers,
  getFollowing,
  getFollowers
}) => {
  let navigate = useNavigate()
  let location = useLocation()
  const [libraries, setLibraries] = useState([])
  const [books, setBooks] = useState([])
  const [bookShow, setBookShow] = useState(false)
  const [follow, setFollow] = useState(false)
  const [loading, setLoading] = useState(true)
  let currentLibraries = []

  const initialState = {
    id: `${location.state.user.id}`,
    username: `${location.state.user.username}`,
    image: `${location.state.user.image}`
  }

  // Check if current user alredy following searched user
  const followed = async () => {
    setFollow(false)
    const result = await axios.get(
      `https://librarydb.fly.dev/api/user/friendList/${user.id}/${initialState.id}`
    )
    console.log(result.data)
    if (result.data.length > 0) {
      if (
        (result.data[0].friendId =
          initialState.id && result.data[0].userId == user.id)
      ) {
        setFollow(true)
        setLoading(false)
      }
    } else {
      setFollow(false)
      setLoading(false)
    }
    // console.log(result.data[0].userId)
  }

  const followUser = async () => {
    const result = await axios.post(
      `https://librarydb.fly.dev/api/user/${user.id}/${initialState.id}`
    )
    console.log(result.data)
    setFollow(true)
    navigate(`user/${initialState.id}`, {
      state: { user: initialState }
    })
    getFollowing(initialState.id)
    getFollowers(initialState.id)
  }
  //   unfollow searched user
  const unfollow = async () => {
    const result = await axios.delete(
      `https://librarydb.fly.dev/api/user/${user.id}/${initialState.id}`
    )
    console.log('Unfollowed')
    setFollow(false)
    navigate(`user/${initialState.id}`, {
      state: { user: initialState }
    })
    getFollowing(initialState.id)
    getFollowers(initialState.id)
  }
  const findLibraries = async () => {
    const result = await axios.get(
      `https://librarydb.fly.dev/api/book/userbook/${initialState.id}`
    )
    console.log(result.data)
    result.data.map(({ library }) => {
      currentLibraries.push(library)
    })
    setLibraries(currentLibraries)
  }
  const getBooks = async (e) => {
    const result = await axios.get(
      `https://librarydb.fly.dev/api/book/library/${initialState.id}/${e.target.value}`
    )
    console.log(result.data)
    setBooks(result.data)
    setBookShow(true)
  }
  const seeBook = (book) => {
    console.log(book)
    navigate(`book/${book.id}`, { state: { book: book } })
  }

  useEffect(() => {
    followed()
    getFollowing(initialState.id)
    getFollowers(initialState.id)
    findLibraries()
  }, [])
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  } else {
    return (
      <div>
        <div className="profile-user">
          <img src={initialState.image} />
          <div className="profile-user-follow">
            <h2>{initialState.username}</h2>
            <h3>Following: {following}</h3>
            <h3>Followers: {followers}</h3>
          </div>
        </div>
        {follow ? (
          <button onClick={unfollow}>Unfollow</button>
        ) : (
          <button onClick={followUser}>Follow</button>
        )}
        <div className="library-card">
          {libraries.map((library) => (
            <div key={library}>
              <button value={library} onClick={getBooks}>
                {library}
              </button>
            </div>
          ))}
        </div>
        <div>
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
      </div>
    )
  }
}
export default UserPage
