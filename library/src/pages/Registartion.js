import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'

const Registartion = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    username: '',
    iamge: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      username: formValues.username,
      image: formValues.image,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues({
      username: '',
      image: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/login')
  }
  return (
    <div className="signin">
      <form className="signin-form" onSubmit={handleSubmit}>
        <br></br>
        <div className="input-wrapper">
          <label htmlFor="username">UserName</label>
          <br></br>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username"
            value={formValues.username}
            required
          />
        </div>
        <br></br>
        <div className="input-wrapper">
          <label htmlFor="image">Profile Picture</label>
          <br></br>
          <input
            onChange={handleChange}
            name="iamge"
            type="file"
            placeholder=""
            value={formValues.image}
            required
          />
        </div>
        <br></br>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email@Address.com"
            value={formValues.email}
            required
          />
        </div>
        <br></br>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formValues.password}
            minlength="8"
            required
            title="8 characters minimum"
          />
        </div>
        <br></br>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br></br>
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            minlength="8"
            required
          />
        </div>
        <br></br>
        <button
          className="submit-btn"
          disabled={
            !formValues.email ||
            (!formValues.password &&
              formValues.confirmPassword === formValues.password)
          }
        >
          Create Account
        </button>
      </form>
    </div>
  )
}
export default Registartion
