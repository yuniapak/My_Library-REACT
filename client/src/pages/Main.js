import Menu from '../img/menu3.png'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  let navigate = useNavigate()

  const search = () => {
    navigate(`/search`)
  }
  const signup = () => {
    navigate(`/signup`)
  }
  return (
    <div className="home-page">
      <h2 className="welcome">Welcome to the library!</h2>
      <h2>
        In this library you don't have to be quiet, look for any book review,
        add to your bookshelf and connect with your friends
      </h2>
      <button onClick={search} className="home-search">
        Search
      </button>
      <button onClick={signup} className="register-btn">
        Join book club
      </button>
      <img src={Menu} />
    </div>
  )
}
export default Main
