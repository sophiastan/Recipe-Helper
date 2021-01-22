import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';

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

  async componentDidMount() {
    let ingredients = await this.state.recipeService.getIngredients(this.state.ingredients);

    if (ingredients) {
      this.setState({
        recipes: ingredients
      })
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
      newTextInputBox.onchange = this.onIngChange;
      document.getElementById("newElementId").appendChild(newTextInputBox);
    }

    this.setState({
      addCount: this.state.addCount + 1
    })
  }

  submit = (ingredients, recipe) => {
    console.log("ingredients: ", ingredients);
    this.state.recipeService.getIngredients(ingredients);
    this.state.recipeService.getIngredientsRecipe(ingredients, recipe);
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
              onChange={this.onIngChange}
            />
            <input 
              type="text" 
              className="ingredient-box"
              placeholder="beef"
              onChange={this.onIngChange}
            />
            <input 
              type="text" 
              className="ingredient-box"
              placeholder="carrot"
              onChange={this.onIngChange}
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
          <button
            type="submit"
            className="generate"
            onClick={() => this.submit(this.state.ingredients, this.state.recipe)}>
              Generate Recipe!
          </button>
        </form>
      </div>
    );
  }
}

export default Home;