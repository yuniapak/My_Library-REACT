import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
const UserPage = () => {
  let location = useLocation()
  const [libraries, setLibraries] = useState([])
  let currentLibraries = []

  const initialState = {
    id: `${location.state.user.id}`,
    username: `${location.state.user.username}`,
    image: `${location.state.user.image}`
  }

  const findLibraries = async () => {
    const result = await axios.get(
      `http://localhost:3001/api/book/userbook/${initialState.id}`
    )
    console.log(result.data)
    result.data.map(({ library }) => {
      currentLibraries.push(library)
    })
    setLibraries(currentLibraries)
  }

  useEffect(() => {
    findLibraries()
  }, [])

  return (
    <div>
      <div className="profile-user">
        <h2>{initialState.username}</h2>
        <img src={initialState.image} />
      </div>
      <div className="library-card">
        {libraries.map((library) => (
          <div key={library}>
            <button value={library}>{library}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default UserPage
