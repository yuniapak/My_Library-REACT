import { useState } from 'react'
import axios from 'axios'
const PasswordSettings =({user, changePassword})=>{
    const [passwordForm, setPasswordForm] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
      })
      const [disabled, setDisabled] = useState(true)
      const updatePassword = async (form) => {
        try {
          const res = await axios.put(
            `https://librarydb01.herokuapp.com/api/auth/update/${user.id}`,
            form
          )
        } catch (error) {
          throw error
        }
      }
    
      const handleChange = (event) => {
        setPasswordForm({
          ...passwordForm,
          [event.target.name]: event.target.value
        })
        button()
      }
    const button = ()=>{
        if(passwordForm.password && passwordForm.newPassword &&
            passwordForm.confirmPassword === passwordForm.newPassword){
                setDisabled(false)
            }
    }
      const handleSubmit = async (e) => {
        e.preventDefault()
        updatePassword({
          password: passwordForm.password,
          newPassword: passwordForm.newPassword
        })
        setPasswordForm({ password: '', newPassword: '', confirmPassword: '' })
      }

    return(
    <div><div className="passwordChange">
    <h1 onClick={changePassword}>Update Password</h1>
    <form onSubmit={handleSubmit}>
      <input
        name="password"
        type="password"
        placeholder="Current Password"
        value={passwordForm.password}
        contentEditable="true"
        onChange={handleChange}
        required
      ></input>
      <input
        name="newPassword"
        type="password"
        placeholder="New Password"
        value={passwordForm.newPassword}
        contentEditable="true"
        onChange={handleChange}
        minlength="8"
        title="8 characters minimum"
        required
      ></input>
      <label htmlFor="password"></label>
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={passwordForm.confirmPassword}
        contentEditable="true"
        onChange={handleChange}
        minlength="8"
        title="8 characters minimum"
        required
      ></input>
      <button
        type="submit"
        disabled={disabled}
        onClick={changePassword}
      >
        Change Password
      </button>
    </form>
  </div></div>)
}
export default PasswordSettings