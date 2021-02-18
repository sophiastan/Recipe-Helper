import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import searchHeader from '../images/search-header.png';
import { slide as Menu } from 'react-burger-menu';
import iconToggle from '../images/icon-toggle.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      recipe: ''
    }
  }

  onChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
     [name] : val
    });
  }

  clearState = () => {
    this.setState({
      recipe: ''
    });
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      // logged out
      case false:
        return [
          <Nav className='ml-auto'>
            <Nav.Link href='/auth/google'>Sign in with Google</Nav.Link>
          </Nav>
        ];
      // logged in
      default: 
        return [
          <Nav className='ml-auto'>
            <NavDropdown title={ `Hello, ${this.props.auth.name}` } id='basic-nav-dropdown'>
              <NavDropdown.Item href='/favorites'>Favorites</NavDropdown.Item>
              <NavDropdown.Item href='/api/logout'>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ];
    }
  }

  render() {
    return (
      <Navbar collapseOnSelect expand='lg' style={{ marginLeft: '160px', marginRight: '160px' }}>
        <Nav className='mr-auto'>
          <Menu disableAutoFocus customBurgerIcon={ <img src={iconToggle} alt='toggle-icon' /> }>
            <p className='toggle-title'>Search by</p>
            <a href='/'>Recipe</a>
            <a href='/ingredient'>Ingredient</a>
            <p className='toggle-title'>Filter by</p>
            <Link to={{
              pathname: '/recipes',
              recipeProps: {
                alphabet: 'A',
                isAlphabet: true
            }}}>A-Z</Link>
            <a href='/'>Category</a>
            <a href='/'>Cuisine</a>
          </Menu>
          <Link to='/'>
            <Navbar.Brand><img src={Logo} className='brand-logo' alt='website logo'/></Navbar.Brand>
          </Link>
        </Nav>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Navbar.Collapse aria-controls='responsive-navbar-nav'>
          <Form className='ml-auto' inline>
            <FormControl type='text' placeholder='Find a recipe' onChange={this.onChange} name='recipe' className='mr-sm-2 search-header'></FormControl>
            <Link  to={{
              pathname: '/recipes',
              recipeProps: {
                recipe: this.state.recipe
              }}}>
              <img src={searchHeader} className='search-header-btn' alt='search' />
            </Link>
          </Form>
          {this.renderContent()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);