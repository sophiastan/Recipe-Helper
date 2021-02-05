import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
// import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Generate from '../images/generate-button-circle.png';
import Text from '../images/text-delicious-healthy-eating.png';


class Home extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredient: "",
      recipe: ""
    }
  }

  onIngChange = (event) => {
    const val = event.target.value;

    this.setState({
      ingredient: val
    });
  }

  onRecipeChange = (event) => {
    const val = event.target.value;

    this.setState({
      recipe: val
    });
  }

  render() {
    return (
      <div>
        <form>
          <div className="ingredient">
            <p className="title">ingredient</p>
            <p className="description">What ingredient are you going to use?</p>
            <input 
              type="text" 
              className="ingredient-input"
              placeholder="onions"
              onBlur={this.onIngChange}
            />
            <input 
              type="text" 
              className="ingredient-input"
              placeholder="celery"
              onBlur={this.onIngChange}
            />
            <input 
              type="text" 
              className="ingredient-input"
              placeholder="carrot"
              onBlur={this.onIngChange}
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
              recipe: this.state.recipe
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
              onChange={this.onRecipeChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Home;