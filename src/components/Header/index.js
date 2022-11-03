import './style.css'
import { NavLink, Outlet } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav >
                <ul className="nav-menu">
                    <li><NavLink to="/users">Users</NavLink></li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
}

export default Header;