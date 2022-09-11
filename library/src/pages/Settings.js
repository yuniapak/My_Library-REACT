import { useState } from 'react'
import axios from 'axios'
const Settings = ({ user, userInfo }) => {
  const [hid, setHid] = useState(true)
  const [hidEdit, setHidEdit] = useState(true)
  const [userProfile, setUserProfile] = useState({
    username: userInfo.username,
    image: userInfo.image
  })
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
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
  const updatePassword = async (form) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/auth/update/${user.id}`,
        form
      )
      console.log(res)
    } catch (error) {
      throw error
    }
  }

  const handleChangePassword = (event) => {
    setPasswordForm({
      ...passwordForm,
      [event.target.name]: event.target.value
    })
    console.log(passwordForm)
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    updatePassword({
      password: passwordForm.password,
      newPassword: passwordForm.newPassword
    })
    setPasswordForm({ password: '', newPassword: '', confirmPassword: '' })
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
          <form onSubmit={handleSubmitPassword}>
            <input
              name="password"
              type="password"
              placeholder="Current Password"
              value={passwordForm.password}
              contentEditable="true"
              onChange={handleChangePassword}
              required
            ></input>
            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={passwordForm.newPassword}
              contentEditable="true"
              onChange={handleChangePassword}
              required
            ></input>
            <label htmlFor="password"></label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={passwordForm.confirmPassword}
              contentEditable="true"
              onChange={handleChangePassword}
              required
            ></input>
            <button
              type="submit"
              disabled={
                !passwordForm.password ||
                (!passwordForm.newPassword &&
                  passwordForm.confirmPassword === passwordForm.newPassword)
              }
              onClick={changePassword}
            >
              Change Password
            </button>
          </form>
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
