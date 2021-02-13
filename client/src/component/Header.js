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

  onChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
     [name] : val
    });
  }

  clearState = () => {
    this.setState({
      recipe: ""
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
          <Nav className="ml-auto">
            <NavDropdown title={ `Hello, ${this.props.auth.name}` } id="basic-nav-dropdown">
              <NavDropdown.Item><Link to="/favorites">Favorites</Link></NavDropdown.Item>
              <NavDropdown.Item href="/api/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ];
    }
  }

  render() {
    // console.log(this.props);
    return (
      <Navbar expand="lg" style={{ padding: '0px'}}>
        <Nav className="mr-auto">
          <NavDropdown id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          </NavDropdown>
          <Link to="/">
            <Navbar.Brand><img src={Logo} className="brand-logo" alt="website logo"/></Navbar.Brand>
          </Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Find a recipe" onChange={this.onChange} name="recipe" className="mr-sm-2" />
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
      // <Navbar collapseOnSelect expand="lg" style={{ padding: '0px'}}>
      //   <Nav className="mr-auto">
      //     <NavDropdown id="basic-nav-dropdown">
      //       <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
      //       <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
      //       <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
      //     </NavDropdown>
      //     <Link to="/">
      //       <Navbar.Brand><img src={Logo} className="brand-logo" alt="website logo"/></Navbar.Brand>
      //     </Link>
      //   </Nav>
      //   <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      //   <Navbar.Collapse aria-controls="responsive-navbar-nav">
      //     <Form className="ml-auto" inline>
      //       <FormControl type="text" placeholder="Find a recipe" onChange={this.onChange} name="recipe" className="mr-sm-2" />
      //       <Link to={{
      //         pathname: "/recipes",
      //         recipeProps: {
      //           recipe: this.state.recipe
      //         }}}>
      //         <Button variant="outline-success">Search</Button>                    
      //       </Link>
      //     </Form>
      //     {this.renderContent()}
      //   </Navbar.Collapse>
      // </Navbar>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);