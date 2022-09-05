import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../services/Auth'

const Login = ({ setUser, toggleAuthenticated }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await signIn(formValues)
    console.log(payload)
    setUser(payload)
    toggleAuthenticated(true)
    setFormValues({ email: '', password: '' })
    navigate('/Profile')
  }
  return (
    <div>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <br></br>
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
              placeholder="Password"
              value={formValues.password}
              required
            />
          </div>
          <button
            className="submit-btn"
            disabled={!formValues.email || !formValues.password}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}
export default Login
