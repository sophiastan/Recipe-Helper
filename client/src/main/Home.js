import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';

class Home extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredients: ""
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
      ingredients: val
    });
  }

  submit = (ingredients) => {
    console.log("ingredients: ", ingredients);
    this.state.recipeService.getIngredients(ingredients);
  }
  
  render() {
    return (
      <div>
        <h1>
          Recipup
        </h1>
        <form>
          <div className="form-group">
          <label>Ingredient: </label>
          <input 
            type="text" 
            className="form-control"
            placeholder="onions"
            onChange={this.onIngChange}
          />
          </div>
          <div className="form-group">
          <label>Ingredient: </label>
          <input 
            type="text" 
            className="form-control"
            placeholder="garlic"
            onChange={this.onIngChange}
          />
          </div>
          <div className="form-group">
          <label>Ingredient: </label>
          <input 
            type="text" 
            className="form-control"
            placeholder="tomato"
            onChange={this.onIngChange}
          />
          </div>
          <button
          type="submit"
          className="teal btn-flat right white-text"
          onClick={() => this.submit(this.state.ingredients)}>
          Submit
        </button>
        </form>
      </div>
    );
  }
}

export default Home;