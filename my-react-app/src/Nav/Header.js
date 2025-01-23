import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import './Header.css'; // Ensure this file exists and has styles for the header

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" exact className="nav-link" activeClassName="active">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/history" className="nav-link" activeClassName="active">History</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/recommendations" className="nav-link" activeClassName="active">Recommendations</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
