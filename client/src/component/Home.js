import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
// import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Generate from '../images/generate-button-circle.png';
import Text from '../images/text-delicious-healthy-eating.png';
import Form from 'react-bootstrap/Form';

class Home extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredient: "",
      recipe: "",
      category: "",
      cuisine: "",
      randomClicked: false
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
      <div>
        <Form>
          <div className="ingredient">
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
              cuisine: this.state.cuisine
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
          {/* <Link to="/random"><img src={Generate} style={{float: 'right'}} alt="generate"/></Link> */}
          {/* <Link to={{
            pathname: "/random",
            randomClicked: !this.state.randomClicked
          }}>
            <img src={Generate} style={{float: 'right'}} alt="generate"/>
          </Link> */}
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
          <div className="recipe">
            <p className="title">cuisine</p>
            <p className="description">input a cuisine</p>
            <input 
              type="text" 
              className="recipe-input"
              name="cuisine"
              onChange={this.onChange}
            />
          </div>
        </Form>
      </div>
    );
  }
}

export default Home;