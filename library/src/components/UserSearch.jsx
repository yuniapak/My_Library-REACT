import { useNavigate } from 'react-router-dom'

const UserSearch = ({searchUserQuery, setSearchUserQuery, findUser, searchedUser})=>{
    let navigate = useNavigate()

    const handleChange = (event) => {
    let input = event.target.value
    setSearchUserQuery(input)
  }

const seeUser = (user)=>{
navigate(`user/${user.id}`, {state:{user:user}})
}

return (
<div>
<div  className="search">
<input type='text' name='search' value ={searchUserQuery} placeholder = 'Username' onChange={handleChange} className='search-input'></input>
<button type='submit' onClick={findUser} className='search-btn'>Search</button>
</div>
<div className='search-elements'>
    { searchedUser.map((user)=>(
        <div key={user.id} onClick={()=>seeUser(user)} className='element'>
        <h2>{user.username}</h2>
        <img src={user.image}/>
        </div>
    ))}
</div>
</div>
)
}
export default UserSearch