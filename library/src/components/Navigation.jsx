import { NavLink } from "react-router-dom";

const Navigation = ({authenticated, user, handleLogOut})=>{
    let authenticatedOption;
    if(user){
       authenticatedOption =(
        <div className="Nav">
        <div className="nav-links">
        <NavLink to='/search'>Search</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        </div>
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