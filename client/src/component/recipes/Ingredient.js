import React, { Component } from 'react';
import RecipeService from '../../services/RecipeService';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import search from '../../images/search.png';

class Ingredient extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredient: ""
    }
  }

  onChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
      [name]: val
    });
  }

  render() {
    return (
      <Form>
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Form.Group style={{ marginTop: '313px' }} controlId="formIngredient">
            <Form.Label style={{ fontSize: '250%' }}>Search by Ingredient</Form.Label>
            <Form.Control type='text' name='ingredient' className='search-bar' onChange={this.onChange} placeholder='Find a recipe' />
            <Link to={{
              pathname: "/recipes",
              recipeProps: {
                ingredient: this.state.ingredient
              }}}>
              <img src={search} className="search-btn" alt="search-btn" />
            </Link>
          </Form.Group>
        </Container>
      </Form>
    );
  }
}

export default Ingredient;