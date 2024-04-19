import React from "react";
import { Link } from "react-router-dom";        
import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <ul>
            <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            
                <li>
                    <Link to="/purchase">Purchase</Link>
                </li>
            </ul> 
        </nav>
    );
}

export default Navbar;