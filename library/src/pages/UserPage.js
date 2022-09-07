import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
const UserPage = ({ user }) => {
  let location = useLocation()
  const [libraries, setLibraries] = useState([])
  const [followingList, setFollowingList] = useState([])
  const [follow, setFollow] = useState(false)
  const [following, setFollowing] = useState('')
  const [followers, setFollowers] = useState('')
  let currentLibraries = []

  const initialState = {
    id: `${location.state.user.id}`,
    username: `${location.state.user.username}`,
    image: `${location.state.user.image}`
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

  const followUser = async () => {
    const result = await axios.post(
      `http://localhost:3001/api/user/${user.id}/${initialState.id}`
    )
    console.log(result.data)
    setFollow(true)
  }
  const followed = async () => {
    const result = await axios.get(
      `http://localhost:3001/api/user/following/${user.id}`
    )
    setFollowingList(result.data)
    followingList.map((friendList) => {
      if (
        friendList.userId == user.id &&
        friendList.friendId == initialState.id
      ) {
        console.log('Alredy followed')
        setFollow(true)
      }
    })
  }
  const unfollow = async () => {
    const result = await axios.delete(
      `http://localhost:3001/api/user/${user.id}/${initialState.id}`
    )
    console.log('Unfollowed')
    setFollow(false)
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
    GetFollowing()
    GetFollowers()
    findLibraries()
    followed()
  }, [])

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
        <button onClick={followUser}>Follow</button>
      ) : (
        <button onClick={unfollow}>Unfollow</button>
      )}
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
