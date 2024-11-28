import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a 
          role="button" 
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu " 
          aria-expanded={isActive ? "true" : "false"} 
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu  ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start ">
          <NavLink to="/" className="navbar-item has-text-right" activeClassName="is-active">
            Home
          </NavLink>
          <NavLink to="/planning" className="navbar-item has-text-right" activeClassName="is-active">
            Planning
          </NavLink>
          <NavLink to="/portfolio" className="navbar-item has-text-right" activeClassName="is-active">
            Portfolio
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Menu;