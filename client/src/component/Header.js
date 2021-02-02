import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../images/logo.png";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg" style={{padding: '0px'}} >
        <Link to="/" className="navbar-brand">
          <img src={Logo} className="brand-logo" alt="website logo"/>
        </Link>
  
        <button className="navbar-toggler" type="button" data-toggle="collpase" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/auth/google" className="nav-link active" style={{color: '#000000'}}>login</a>
            </li>
            <li className="nav-item">
              <a href="/api/logout" className="nav-link active" style={{color: '#000000'}}>logout</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;