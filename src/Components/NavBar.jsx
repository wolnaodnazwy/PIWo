import React from 'react';
import logo from '../logo.svg'; 


const NavBar = () => {
  return (
    <nav className="fixed-navigation">
      <img className="logo" src={logo} alt="Logo" />
      <ul className="nav-links">
        <li><a className="nav-link" href="#">Home</a></li>
        <li><a className="nav-link" href="#">Find offers</a></li>
        <li><a className="nav-link" href="#">Add new offers</a></li>
        <li><a className="nav-link" href="#">My offers</a></li>
        <li><a className="nav-link" href="#">Favorites</a></li>
        <button className="button primary">Log out</button>
      </ul>
      <button className="button primary hidden">Menu</button>
    </nav>
  );
};

export default NavBar;