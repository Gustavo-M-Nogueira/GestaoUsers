// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header bg-success text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo com link */}
                <Link to="/" className="logo-link">
                    <img src="/logo.png" alt="Logo" className="logo" style={{ height: '50px' }} />
                </Link>

                {/* Navbar */}
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-white">User List</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/new" className="nav-link text-white">Add User</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
