import {Link} from 'react-router-dom';
import './Navbar.scss';
import React, { useState } from 'react';
import { useAuth } from "../AuthContext";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { logout } = useAuth();

    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <button className="burger-btn" onClick={() => setShowMenu(!showMenu)}>
                ☰
            </button>

            <div className={`links ${showMenu ? 'show-menu' : ''}`}>
                <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
                <Link to="/create" onClick={() => setShowMenu(false)}>New Blog</Link>
                <Link to="/galeria" onClick={() => setShowMenu(false)}>Galeria</Link>
                <Link to="/team" onClick={() => setShowMenu(false)}>Team</Link>
                <Link to="/add-drone" onClick={() => setShowMenu(false)}>Add Drone</Link>
                <Link to="/login" onClick={() => setShowMenu(false)}>Login</Link>
                <Link to="/" onClick={()=>logout()}>Logout</Link>
            </div>
        </nav>
    );
};

export default Navbar;

