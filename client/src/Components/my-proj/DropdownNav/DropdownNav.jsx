import React, { useState } from "react";
import { Link } from "react-router-dom";
import './DropdownNav.css';

function DropdownNav(){

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className="dropdown-nav-page-wrapper">
            <nav className="dropdown-navbar">
                <div className="dropdown-navbar-logo">
                    <Link to="/">MySite</Link>
                </div>
                <ul className="dropdown-nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">About</Link></li>
                    <li className="dropdown-item">
                        <button onClick={toggleDropdown} className="dropdown-toggle">
                            services <span>▼</span>
                        </button>
                        <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                            <li>Web Design</li>
                            <li>SEO</li>
                            <li>Consulting</li>
                        </ul>
                    </li>
                    <li><Link to="/">Contact</Link></li>
                </ul>
            </nav>
            <div className="dropdown-page-content">
                <h1>Dropdown Navigation Example</h1>
                <p>Click on "Services" to see the dropdown menu in action.</p>
            </div>
        </div>
    );

}

export default DropdownNav;