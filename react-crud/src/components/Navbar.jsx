import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './utils/auth'; // Import a custom hook or library for authentication

function Navbar() {
  const { user, login, logout } = useAuth(); // Get the user object and the login/logout functions from the custom hook or library
  const isLoggedIn = user !== null; // Determine user's authentication status based on the user object

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {/* Logo or title here */}
          <img src="/logo.png" alt="Logo" />
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Add other links based on requirements */}
          <li>
            <Link to="/items">Items</Link>
          </li>
          <li>
            <Link to="/reservations">Reservations</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              {/* Add admin link if applicable */}
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
            </>
          )}
        </ul>
        {/* Add login/logout buttons or user profile icon if applicable */}
        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
