import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="nav-wrapper">
            <div className="container">
                <Link to="/" className="nav-logo">
                    DevBin
                </Link>

                <div className="nav-links">
                    <Link to="/about" className="nav-link">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;