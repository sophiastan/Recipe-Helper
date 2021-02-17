import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import search from '../images/search.png';


class Home extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredient: "",
      recipe: "",
      category: "",
      cuisine: "",
      alphabet: ""
      // randomClicked: false
    }
  }

  onChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
      [name]: val
    });
  }

  prepareAlphabets = () => {
    let result = [];
    for(let i=65; i<91; i++) {
      result.push(
        <Link to={{
          pathname: "/recipes",
          recipeProps: {
            ingredient: this.state.ingredient,
            recipe: this.state.recipe,
            category: this.state.category,
            cuisine: this.state.cuisine,
            alphabet: String.fromCharCode(i)
          }}}>
          <Button type="button" key={i} name="alphabet" onClick={this.onChange} value={String.fromCharCode(i)} variant="outline-secondary" >
            {String.fromCharCode(i)}
          </Button>
        </Link>
      )
    }
    console.log(this.state.alphabet);
    return result;
  }

  render() {
    return (
      <Form>
        {/* <ButtonGroup size="lg" style={{ paddingTop: "40px" }}>
          {this.prepareAlphabets()}
        </ButtonGroup> */}
        {/* <Container> */}
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Form.Group style={{ marginTop: '313px' }} controlId="formMeal">
            <Form.Label style={{ fontSize: '250%' }}>Search by Recipe</Form.Label>
            <Form.Control type='text' name='recipe' className='search-bar' onChange={this.onChange} placeholder='Find a recipe' />
            <Link to={{
              pathname: "/recipes",
              recipeProps: {
                ingredient: this.state.ingredient,
                recipe: this.state.recipe,
                category: this.state.category,
                cuisine: this.state.cuisine,
                alphabet: this.state.alphabet
              }}}>
              <img src={search} className="search-btn" alt="search-btn" />
            </Link>
          </Form.Group>
        </Container>
        {/* <div className="ingredient">
          <p className="title">ingredient</p>
          <p className="description">What ingredient are you going to use?</p>
          <input 
            type="text" 
            className="ingredient-input"
            placeholder="onions"
            name="ingredient"
            onChange={this.onChange}
          />
          <input 
            type="text" 
            className="ingredient-input"
            placeholder="celery"
            name="ingredient"
            onChange={this.onChange}
          />
          <input 
            type="text" 
            className="ingredient-input"
            placeholder="carrot"
            name="ingredient"
            onChange={this.onChange}
          />
          <div id="newElementId"></div>
          <button 
            type="button" 
            className="add">+
          </button>
        </div>
        <Link to={{
          pathname: "/recipes",
          recipeProps: {
            ingredient: this.state.ingredient,
            recipe: this.state.recipe,
            category: this.state.category,
            cuisine: this.state.cuisine,
            alphabet: this.state.alphabet
          }}}>
          <img src={Generate} className="generate" alt="generate button"/>
        </Link>
        <img src={Text} className="text-delicious" alt="text"/>
        <p className="with-text">With randomly generated recipes using your ingredients</p>
        <div className="recipe">
          <p className="title">recipe</p>
          <p className="description">input general recipe name</p>
          <input 
            type="text" 
            className="recipe-input"
            name="recipe"
            onChange={this.onChange}
          />
        </div>
        <div className="recipe">
          <p className="title">category</p>
          <p className="description">input a category</p>
          <input 
            type="text" 
            className="recipe-input"
            name="category"
            onChange={this.onChange}
          />
        </div>
        <Form.Group controlId="formCuisine">
          <Form.Label>cuisine</Form.Label>
          <Form.Text className="text-muted">input a cuisine </Form.Text>
          <Form.Control type="text" name="cuisine" onChange={this.onChange} />
        </Form.Group> */}
      </Form>
    );
  }
}

export default Home;