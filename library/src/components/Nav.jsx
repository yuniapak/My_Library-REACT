import { NavLink } from "react-router-dom";
const Nav = ()=>{
    return <div className="Nav">
        <NavLink to='/search'>Search</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
    </div>
}
export default Nav