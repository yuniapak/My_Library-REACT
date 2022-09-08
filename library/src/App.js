import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import axios from 'axios'
import BookForm from './pages/BookForm'
import BookCard from './pages/BookCard'
import Login from './pages/Login'
import Main from './pages/Main'
import Profile from './pages/Profile'
import Registration from './pages/Registartion.js'
import Search from './pages/Search'
import SearchBookCard from './pages/SearchBookCard'
import Navigation from './components/Navigation'
import UserPage from './pages/UserPage'
const API_KEY = process.env.REACT_APP_BOOKS_API_KEY
function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const [existBookId, setExistBookId] = useState(null)
  const [following, setFollowing] = useState('')
  const [followers, setFollowers] = useState('')
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [library, setLibrary] = useState('')
  const [inLibrary, setInLibrary] = useState(false)

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    console.log(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      checkToken()
    }
  }, [])

  //followers
  const GetFollowing = async (id) => {
    const result = await axios.get(
      `http://localhost:3001/api/user/following/${id}`
    )
    console.log(id)
    console.log(result.data)
    let followingCount = ' ' + result.data.length
    setFollowing(followingCount)
  }

  const GetFollowers = async (id) => {
    const res = await axios.get(
      `http://localhost:3001/api/user/followers/${id}`
    )
    console.log(id)

    setFollowers(res.data.length)
  }

  const getReviews = async (title) => {
    setInLibrary(false)
    const result = await axios.get(
      `http://localhost:3001/api/book/title/bookTitle?search=${title}`
    )
    console.log(result.data)
    result.data.map((elem) => {
      setExistBookId(elem.id)
    })
    result.data.map((elem) => {
      console.log(elem.id)
    })
    if (isNaN(existBookId)) {
      console.log('not in library')
      setInLibrary(false)
    } else {
      console.log('finding reviews')
      const res = await axios.get(
        `http://localhost:3001/api/review/${existBookId}`
      )
      console.log(res.data)
      setReviews(res.data)
      reviews.map((elem) => {
        findBook(elem.id)
      })
    }
  }
  const findBook = async (bookId) => {
    const result = await axios.get(
      `http://localhost:3001/api/book/userbook/book/${user.id}/${bookId}`
    )
    setInLibrary(true)
    console.log(result.data)
    setLibrary(result.data[0].library)
    setExistBookId(null)
  }

  return (
    <div>
      <header>
        <Navigation
          authenticated={authenticated}
          user={user}
          handleLogOut={handleLogOut}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route path="/signup" element={<Registration />} />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                following={following}
                followers={followers}
                GetFollowing={GetFollowing}
                GetFollowers={GetFollowers}
              />
            }
          />
          <Route
            path="/search/user/*"
            element={
              <UserPage
                user={user}
                following={following}
                followers={followers}
                GetFollowing={GetFollowing}
                GetFollowers={GetFollowers}
              />
            }
          />
          <Route path="/search" element={<Search API_KEY={API_KEY} />} />
          <Route path="profile/book/*" element={<BookCard />} />
          <Route
            path="search/book/*"
            element={
              <SearchBookCard
                user={user}
                reviews={reviews}
                inLibrary={inLibrary}
                library={library}
                getReviews={getReviews}
                findBook={findBook}
              />
            }
          />
          <Route
            path="search/book/bookForm/*"
            element={<BookForm user={user} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
