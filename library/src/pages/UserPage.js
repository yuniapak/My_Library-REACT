import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
const UserPage = ({
  user,
  following,
  followers,
  GetFollowing,
  GetFollowers
}) => {
  let navigate = useNavigate()
  let location = useLocation()
  const [libraries, setLibraries] = useState([])
  const [followingList, setFollowingList] = useState([])
  const [follow, setFollow] = useState(false)

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
      `http://localhost:3001/api/user/following/${user.id}`
    )
    setFollowingList(result.data)
    // console.log(result.data)
    // console.log(user.id)
    // console.log(parseInt(initialState.id))
    // followingList.map((friendList) => {
    //   console.log(friendList.userId)
    // })
    // followingList.map((friendList) => {
    //   console.log(friendList.friendId)
    // })
    followingList.map((friendList) => {
      if (
        friendList.userId === user.id &&
        friendList.friendId === parseInt(initialState.id)
      ) {
        console.log('Alredy followed')
        setFollow(true)
      }
    })
  }

  const followUser = async () => {
    const result = await axios.post(
      `http://localhost:3001/api/user/${user.id}/${initialState.id}`
    )
    console.log(result.data)
    setFollow(true)
    navigate(`user/${initialState.id}`, {
      state: { user: initialState }
    })
  }
  //   unfollow searched user
  const unfollow = async () => {
    const result = await axios.delete(
      `http://localhost:3001/api/user/${user.id}/${initialState.id}`
    )
    console.log('Unfollowed')
    setFollow(false)
    navigate(`user/${initialState.id}`, {
      state: { user: initialState }
    })
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
    followed()
    GetFollowing(initialState.id)
    GetFollowers(initialState.id)
    findLibraries()
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
        <button onClick={unfollow}>Unfollow</button>
      ) : (
        <button onClick={followUser}>Follow</button>
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
