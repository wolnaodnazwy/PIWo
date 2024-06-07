import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, logout } from '../firebase';
import logo from '../logo.svg'; 

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    logout().catch(error => {
      console.error("Logout error: ", error);
    });
  };

  return (
    <nav className="fixed-navigation">
      <img className="logo" src={logo} alt="Logo" />
      <ul className="nav-links">
        <li><Link className="nav-link" to="/">Home</Link></li>
        <li><Link className="nav-link" to="#">Find offers</Link></li>
        <li><Link className="nav-link" to="#">Add new offers</Link></li>
        <li><Link className="nav-link" to="#">My offers</Link></li>
        <li><Link className="nav-link" to="/favorites">Favorites</Link></li>
        {user ? (
          <button className="button primary" onClick={handleLogout}>Log out</button>
        ) : (
          <Link className="button primary" to="/login">Log in</Link>
        )}
      </ul>
      <button className="button primary hidden">Menu</button>
    </nav>
  );
};

export default NavBar;