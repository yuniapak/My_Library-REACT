import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
const Navigation = ({authenticated, user, handleLogOut})=>{
    let authenticatedOption;
    if(user){
       authenticatedOption =(
    //     <div className="Nav">
    //     <div className="nav-links">
    //     <NavLink to='/search'>Search</NavLink>
    //     <NavLink to='/profile'>Profile</NavLink>
    //     </div>
    //     <div className='nav-dropdown'>

    //   <DropdownButton id="dropdown-basic-button" title="Settings" autoClose='true'>
    //     <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
    //     <Dropdown.Item href="/" onClick={handleLogOut}>Log Out</Dropdown.Item>
    //   </DropdownButton>
       <div className="Nav">
    <div className="nav-links">
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={handleLogOut}>
                LogOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
    </div> 
        )
    }
    const publicOption = (
        // <div className="Nav">
        // <div>
        // <NavLink to='/signup'>SignUp</NavLink>
        // <NavLink to='/login'>LogIn</NavLink>
        // </div>
        <div className="nav-links">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Library</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/signup">SignUp</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
            </div>

    )
    return (
        <div>{authenticated && user ? authenticatedOption : publicOption}</div>
    )
    
}
export default Navigation