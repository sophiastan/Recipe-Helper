import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import RecipeCard from './RecipeCard';

class RecipeList extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredients: props.location.recipeProps.ingredients,
      recipe: props.location.recipeProps.recipe
    }
  }

  async componentDidMount() {
    console.log("recipeList componentDidMount");
    // console.log("ingredients:\n", this.state.ingredients);
    // console.log("recipe:\n", this.state.recipe);
    if (this.state.ingredients) {
      let list = await this.state.recipeService.getIngredients(this.state.ingredients);
      console.log("list from RecipeList: ");
      console.log(list.results);
      
      this.setState({
        list: list.results
      });

      console.log("list: ", this.state.list);
    }
    
    if (this.state.ingredients && this.state.recipe) {
      let listRecipe = await this.state.recipeService.getIngredientsRecipe(this.state.ingredients, this.state.recipe);
      console.log("list from RecipeList: ");
      console.log(listRecipe.results);
      this.setState({
        list: listRecipe.results
      });

      console.log("list: ", this.state.list);
    }
  }

  render() {
    return (
      <div>
        <p className="list-title">ingredient</p>
        <p className="list-title">recipe</p>
        <div className="recipe-list">
          {
            this.state.list ? this.state.list.map((recipeObj, index) => {
              return (<RecipeCard key={index} recipe={recipeObj}/>);
            }) : <h2>no results!</h2>
          }
        </div>
      </div>
    );
  }
}

export default RecipeList;