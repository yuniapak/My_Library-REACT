import { NavLink } from "react-router-dom";
import {useState} from 'react'
import Menu from "../img/menu4.png"
const Navigation = ({authenticated, user, handleLogOut})=>{
    const [style, setStyle] = useState('Nav-hidden')
    
    let authenticatedOption;

    if(user){
       authenticatedOption =(
        <div className="Nav">
        <button className='nav-button'><img src={Menu}/></button>
        
        <div className="dropdown">
        <NavLink to='#'></NavLink>
        <NavLink to='/search'>Search</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/settings' >Settings</NavLink>
        <NavLink to ='/' onClick={handleLogOut} >LogOut</NavLink> 
    </div> 
    </div>
        )
    }
    const publicOption = (
        <div className="Nav">
            <button className='nav-button'><img src={Menu}/></button>
        <div className="dropdown">
        <NavLink to='#'></NavLink>
        <NavLink to='/signup'>SignUp</NavLink>
        <NavLink to='/login'>LogIn</NavLink>
        <NavLink to='/search'>Search</NavLink>
        </div>
        </div>
    )
    return (
        <div>{authenticated && user ? authenticatedOption : publicOption}</div>
    )
    
}
export default Navigation