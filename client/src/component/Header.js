import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from "../images/logo.png";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      // logged out
      case false:
        return [
          <li className="nav-item">
            <a href="/auth/google" className="nav-link active" style={{color: '#000000'}}>Login With Google</a>
          </li>
        ];
      // logged in
      default: 
        return [
          <div>
            <li className="nav-item">Hello, { this.props.auth.name }</li>
            <li className="nav-item">
              <a href="/api/logout" className="nav-link active" style={{color: '#000000'}}>logout</a>
            </li>
          </div>
        ];
    }
  }

  render() {
    // console.log(this.props);
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
            { this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);