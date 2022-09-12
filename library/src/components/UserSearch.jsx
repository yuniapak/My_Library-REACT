import { useNavigate } from 'react-router-dom'

const UserSearch = ({searchedUser, userSearch})=>{
    let navigate = useNavigate()

const seeUser = (user)=>{
navigate(`user/${user.id}`, {state:{user:user}})
}

return (
<div>
{userSearch ?
(<div className='search-elements'>
    { searchedUser.map((user)=>(
        <div key={user.id} onClick={()=>seeUser(user)} className='element'>
        <h2>{user.username}</h2>
        <img src={user.image}/>
        </div>
    ))}
</div>) : null}
</div>
)

}
export default UserSearch