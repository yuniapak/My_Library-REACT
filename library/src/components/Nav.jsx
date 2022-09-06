import { NavLink } from "react-router-dom";
const Nav = ()=>{
    return <div>
        <NavLink to='/search'>Search</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
    </div>
}
export default Nav