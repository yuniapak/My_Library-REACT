import './App.css'
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
import Settings from './pages/Settings'
import UserPage from './pages/UserPage'
const API_KEY = process.env.REACT_APP_BOOKS_API_KEY
function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [following, setFollowing] = useState('')
  const [followers, setFollowers] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingFinished, setLoadingFinished] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

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
    console.log('authenticated!')
    setLoading(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      checkToken()
    }
  }, [])

  //followers
  const getFollowing = async (id) => {
    const result = await axios.get(
      `http://localhost:3001/api/user/following/${id}`
    )
    console.log(id)
    console.log(result.data)
    let followingCount = ' ' + result.data.length
    setFollowing(followingCount)
    console.log('followers got')
    setLoadingFinished(true)
  }

  const getFollowers = async (id) => {
    const res = await axios.get(
      `http://localhost:3001/api/user/followers/${id}`
    )
    console.log(id)
    console.log('following got')
    setFollowers(res.data.length)
    setLoadingFinished(true)
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
                setLoading={setLoading}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signup" element={<Registration />} />
          <Route
            path="/profile"
            element={
              <Profile
                loading={loading}
                user={user}
                loadingFinished={loadingFinished}
                currentUser={currentUser}
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
                getFollowing={getFollowing}
                getFollowers={getFollowers}
              />
            }
          />
          <Route path="/search" element={<Search API_KEY={API_KEY} />} />
          <Route path="profile/book/*" element={<BookCard />} />
          <Route
            path="search/book/*"
            element={<SearchBookCard currentUser={currentUser} user={user} />}
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
