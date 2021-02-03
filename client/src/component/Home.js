import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import { Link } from 'react-router-dom';
import Generate from '../images/generate-button-circle.png';
import Text from '../images/text-delicious-healthy-eating.png';


class Home extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredients: "",
      recipe: "",
      addCount: 0
    }
  }

  onIngChange = (event) => {
    const val = event.target.value;

    this.setState({
      ingredients: this.state.ingredients + "," + val
    });
  }

  onRecipeChange = (event) => {
    const val = event.target.value;

    this.setState({
      recipe: val
    });
  }

  handleAdd = () => {
    if (this.state.addCount < 3) {
      const newTextInputBox = document.createElement('input');
      newTextInputBox.className = "ingredient-input";
      newTextInputBox.onblur = this.onIngChange;
      document.getElementById("newElementId").appendChild(newTextInputBox);
    }

    this.setState({
      addCount: this.state.addCount + 1
    })
  }

  render() {
    return (
      <div>
        <form>
          <div className="ingredient">
            <p className="title">ingredient</p>
            <p className="description">What ingredients are you going to use?</p>
            <input 
              type="text" 
              className="ingredient-input"
              placeholder="onions"
              value="onions"
              onBlur={this.onIngChange}
            />
            <input 
              type="text" 
              className="ingredient-input"
              placeholder="celery"
              value="celery"
              onBlur={this.onIngChange}
            />
            <input 
              type="text" 
              className="ingredient-input"
              placeholder="carrot"
              value="carrot"
              onBlur={this.onIngChange}
            />
            <div id="newElementId"></div>
            <button 
              type="button" 
              className="add"
              onClick={() => this.handleAdd()}>+
            </button>
          </div>
          <Link to={{
            pathname: "/recipes",
            recipeProps: {
              ingredients: this.state.ingredients.slice(1).split(','),
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