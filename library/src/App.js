import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import axios from 'axios'
import BookCard from './pages/BookCard'
import Login from './pages/Login'
import Main from './pages/Main'
import Profile from './pages/Profile'
import Registration from './pages/Registartion.js'
import Search from './pages/Search'
import Nav from './components/Nav'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [currentUser, setCurrentUser] = useState({})

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    getCurrentUser()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const getCurrentUser = async () => {
    const result = await axios.get(
      `http://localhost:3001/api/user/userId/${user.id}`
    )
    console.log(result.data)
    setCurrentUser(result.data)
  }

  return (
    <div>
      <header>
        <Nav
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
            element={<Profile currentUser={currentUser} />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="/book" element={<BookCard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
