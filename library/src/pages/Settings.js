import { useState } from 'react'
import axios from 'axios'
import PasswordSettings from '../components/PasswordSettings'
const Settings = ({ user, userInfo }) => {
  const [hid, setHid] = useState(true)
  const [hidEdit, setHidEdit] = useState(true)
  const [userProfile, setUserProfile] = useState({
    username: userInfo.username,
    image: userInfo.image
  })
  console.log(userInfo)
  console.log(user)

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
      `https://librarydb.fly.dev/api/user/${user.id}`,
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
        <PasswordSettings changePassword={changePassword} user={user} />
      )}
      {hidEdit ? (
        <div className="infoChange">
          <h1 onClick={changeInfo}>Profile Settings</h1>
        </div>
      ) : (
        <div className="infoChange">
          <h1 onClick={changeInfo}>Profile Settings</h1>
          <form onSubmit={handleSubmit}>
            <div className="img-settings">
              <img src={userProfile.image} />
              <input
                name="image"
                type="text"
                placeholder="ImageURL"
                onChange={handleChange}
                defaultValue=""
                contentEditable="true"
                required
              ></input>
            </div>
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
