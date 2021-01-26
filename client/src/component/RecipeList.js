import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import GenerateAnother from '../images/generate-another-button.png';

class RecipeList extends Component {
  constructor(props) {
    super();

    // const ingredients = props.location.recipeProps.ingredients.slice(1).split(',');
    // const recipe = props.location.recipeProps.recipe;
    // for (let ing of ingredients) {
    //   console.log(ing);
    // }
    
    // console.log("recipe: ", props.location.recipeProps.recipe);

    this.state = {
      recipeService: new RecipeService(),
      ingredients: props.location.recipeProps.ingredients.slice(1).split(','),
      recipe: props.location.recipeProps.recipe,
    }
  }

  async componentDidMount() {
    console.log("recipeList componentDidMount");
    if (this.state.ingredients) {
      let list = await this.state.recipeService.getIngredients(this.state.ingredients);
      
      this.setState({
        list: list.results
      });

      console.log("list from RecipeList: ", this.state.list);
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
        <div className="info-box">
          {
            this.state.ingredients ? this.state.ingredients.map((ing, index) => (
              <div key={index} className="ingredient-box">
                <p>{ing}</p>
              </div>
            )) : <p>no results!</p>
          }
          {
            this.state.recipe ? (<div className="recipe-box">{this.state.recipe}</div>) : <div></div>
          }
        </div>
        <Link to="/">
          <img className="generate-another" src={GenerateAnother} alt="generate another recipe"/>
        </Link>
        <p className="list-title">recipe</p>
        <div className="recipe-list">
          {
            this.state.list ? this.state.list.map((recipeObj, index) => {
              return (<RecipeCard key={index} recipe={recipeObj} ingredients={this.state.ingredients}/>);
            }) : <h2>no results!</h2>
          }
        </div>
      </div>
    );
  }
}

export default RecipeList;