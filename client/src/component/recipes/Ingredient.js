import React, { Component } from 'react';
import RecipeService from '../../services/RecipeService';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import logo from '../../images/ing-logo.png';
import search from '../../images/search.png';

class Ingredient extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredient: "",
      random: {}
    }
  }

  async componentDidMount() {
    let random = await this.state.recipeService.getRandomRecipe();
    this.setState({
      random: random
    });
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
        <Container className='main'>
          <img src={logo} className='ing-logo' alt='logo' />
          <Form.Group controlId="formIngredient">
            <Form.Label style={{ fontSize: '250%', marginTop: '35px' }}>Search by Ingredient</Form.Label>
            <Form.Control type='text' name='ingredient' className='search-bar' onChange={this.onChange} placeholder='Enter an ingredient' />
            <Link to={{
              pathname: "/recipes",
              recipeProps: {
                ingredient: this.state.ingredient
              }}}>
              <img src={search} className="search-btn" alt="search-btn" />
            </Link>
          </Form.Group>
          <div className='random-info'>
            {/* <div>
              <p>Click for another random recipe</p>
            </div> */}
            <div className='random-box'>
              <Link to={{
                pathname: `/recipes/${this.state.random.idMeal}`,
                recipeProps: {
                  recipeID: this.state.random.idMeal
                }
              }}>
                <img style={{ width: '124px', borderRadius: '15px'}} src={this.state.random.strMealThumb} alt='img' />
              </Link>
              <div>
                <p>random recipe</p>
                <h6>{this.state.random.strMeal}</h6>
              </div>
            </div>
          </div>
        </Container>
      </Form>
    );
  }
}

export default Ingredient;