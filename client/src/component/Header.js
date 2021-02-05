import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from "../images/logo.png";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class Header extends Component {
  constructor(props) {
    super();

    this.state = {
      recipe: ""
    }
  }

  onRecipeChange = (event) => {
    const val = event.target.value;

    this.setState({
      recipe: val
    });
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      // logged out
      case false:
        return [
          <Nav className="ml-auto">
            <Nav.Link href="/auth/google">Sign in with Google</Nav.Link>
          </Nav>
        ];
      // logged in
      default: 
        return [
          //   <li className="nav-item">Hello, { this.props.auth.name }</li>
          <Nav className="ml-auto">
            <NavDropdown title="Your Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/favorites">Favorites</NavDropdown.Item>
              <NavDropdown.Item href="/api/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ];
    }
  }

  render() {
    // console.log(this.props);
    return (
      <Navbar style={{ padding: '0px'}}>
        <Nav className="mr-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          </NavDropdown>
          <Link to="/">
            <Navbar.Brand><img src={Logo} className="brand-logo" alt="website logo"/></Navbar.Brand>
          </Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Find a recipe" onChange={this.onRecipeChange} className="mr-sm-2" />
          <Link to={{
            pathname: "/recipes",
            recipeProps: {
              recipe: this.state.recipe
            }}}>
            <Button variant="outline-success">Search</Button>
          </Link>
        </Form>
        {this.renderContent()}
      </Navbar>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);