import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const username = localStorage.getItem('username');
  const userIcon = username
    ? `https://your-backend-url.com/avatar/${username}`
    : 'https://www.w3schools.com/w3images/avatar2.png';

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/history" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              History
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/recommendation" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Recommendations
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        {username ? (
          <>
            <img src={userIcon} alt="User Icon" className="user-icon" />
            <span className="username">{username}</span>
          </>
        ) : (
          <span className="username">Guest</span>
        )}
      </div>
    </header>
  );
};

export default Header;
