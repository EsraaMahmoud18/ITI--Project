import { NavLink } from "react-router-dom";

function Navbar() {
    return (
<div className="navbar bg-lightblue navbar-dark text-white sticky-top navbar-expand">
        <NavLink to="/" className="navbar-brand">
            <i className="bi bi-hospital" style={{ marginLeft: 10 }}></i> Hawaa Hospital
        </NavLink>
        <ul className=" nav nav-tabs navbar-nav">
            <li className="nav-item active ">
                <NavLink to='/about' className='nav-link text-dark'>About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/contact' className='nav-link text-dark'>Contact</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/patients' className='nav-link text-dark'> Our Patients</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='*' className='nav-link text-dark' tabindex="-1" aria-disabled="true">Disabled</NavLink>
            </li>
        </ul>
        </div>
     
    );
}
export default Navbar;