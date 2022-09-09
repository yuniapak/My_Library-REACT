import { NavLink } from "react-router-dom";
import {useState} from 'react'
import SettingsImg from "../img/settingIcon.png"
const Navigation = ({authenticated, user, handleLogOut})=>{
    const [style, setStyle] = useState('Nav-hidden')
    
    const changeStyle = () =>{
        if(style == 'Nav-hidden'){
        setStyle('Nav-unhidden')
    }else{
        setStyle('Nav-hidden')
    }
    }

    let authenticatedOption;

    if(user){
       authenticatedOption =(
        <div className="Nav">
        <div className="nav-links">
        <NavLink to='/search'>Search</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        </div>
        {/* <div className="nav-column">
        {/* <button onClick={changeStyle} className="nav-settings"><img src={SettingsImg}/></button>
            { style == 'Nav-hidden' ? ( null) :
        ( <div className={style}> <NavLink to='/settings' >Settings</NavLink>
        <NavLink to ='/' onClick={handleLogOut} >LogOut</NavLink> </div>)} */}

    </div> 
        )
    }
    const publicOption = (
        <div className="Nav">
        <div>
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