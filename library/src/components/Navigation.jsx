import { NavLink } from "react-router-dom";
import {useState} from 'react'
import SettingsImg from "../img/settingIcon.png"
const Navigation = ({authenticated, user, handleLogOut})=>{
    const [style, setStyle] = useState('Nav-hidden')
    
    let authenticatedOption;

    if(user){
       authenticatedOption =(
        <div className="Nav">
        <button className='nav-button'>Button</button>
        
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
            <button className='nav-button'>Button</button>
        <div className="dropdown">
        <NavLink to='/signup'>SignUp</NavLink>
        <NavLink to='/login'>LogIn</NavLink>
        </div>
        </div>
    )
    return (
        <div>{authenticated && user ? authenticatedOption : publicOption}</div>
    )
    
}
export default Navigation