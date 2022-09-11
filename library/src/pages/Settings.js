import { useState } from 'react'
import axios from 'axios'
const Settings = ({ user, userInfo }) => {
  const [hid, setHid] = useState(true)
  const [hidEdit, setHidEdit] = useState(true)
  const [userProfile, setUserProfile] = useState({
    username: userInfo.username,
    image: userInfo.image
  })
  console.log(userInfo)
  const changePassword = () => {
    if (hid == true) {
      setHid(false)
    } else {
      setHid(true)
    }
  }
  const changeInfo = () => {
    if (hidEdit === true) {
      setHidEdit(false)
    } else {
      setHidEdit(true)
    }
  }
  const changeUserInfo = async (info) => {
    const result = await axios.put(
      `http://localhost:3001/api/user/${user.id}`,
      info
    )
  }
  const handleChange = (event) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value
    })
    console.log(userProfile)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await changeUserInfo(userProfile)
    changeInfo()
    console.log('updated!')
  }

  return (
    <div className="settings">
      <h2>Settings</h2>
      {hid ? (
        <div className="passwordChange">
          <h1 onClick={changePassword}>Update Password</h1>
        </div>
      ) : (
        <div className="passwordChange">
          <h1 onClick={changePassword}>Update Password</h1>
        </div>
      )}
      {hidEdit ? (
        <div className="infoChange">
          <h1 onClick={changeInfo}>Profile Settings</h1>
        </div>
      ) : (
        <div className="infoChange">
          <h1>Profile Settings</h1>
          <form onSubmit={handleSubmit}>
            <img src={userInfo.image} />
            {/* {image.value !== '' ? <img src="#" /> : null} */}
            <input
              name="image"
              type="text"
              placeholder="ImageURL"
              onChange={handleChange}
              value=""
            ></input>
            <h3>Username:</h3>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              placeholder={userInfo.username}
              defaultValue={userInfo.username}
              contentEditable="true"
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  )
}
export default Settings
