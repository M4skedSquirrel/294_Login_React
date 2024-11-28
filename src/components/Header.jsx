import '../styles/Header.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    let header = "myplan";
  return (
    <header className="hero is-link">
      <div className="hero-body">
        <p className="has-text-weight-bold has-text-centered	is-size-3">{header.toUpperCase()}</p>
      </div>
    </header>
  );
}

export default Header;
