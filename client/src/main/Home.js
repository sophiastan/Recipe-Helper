import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import { Link } from 'react-router-dom';

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
      newTextInputBox.className = "ingredient-box";
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
              className="ingredient-box"
              placeholder="onion"
              onBlur={this.onIngChange}
            />
            <input 
              type="text" 
              className="ingredient-box"
              placeholder="beef"
              onBlur={this.onIngChange}
            />
            <input 
              type="text" 
              className="ingredient-box"
              placeholder="carrot"
              onBlur={this.onIngChange}
            />
            <div id="newElementId"></div>
            <button 
              type="button" 
              className="add"
              onClick={() => this.handleAdd()}>+
            </button>
          </div>
          <div className="recipe">
            <p className="title">recipe</p>
            <p className="description">input general recipe name</p>
            <input 
              type="text" 
              className="recipe-box"
              onChange={this.onRecipeChange}
            />
          </div>
          <Link to={{
            pathname: "/recipe",
            recipeProps: {
              ingredients: this.state.ingredients,
              recipe: this.state.recipe
            }}}>
            <button
              type="submit"
              className="generate"
              >
                Generate Recipe!
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Home;