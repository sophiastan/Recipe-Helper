import React, { Component } from 'react';
import RecipeService from '../services/RecipeService';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import GenerateAnother from '../images/generate-another-button.png';

class RecipeList extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredient: props.location.recipeProps.ingredient,
      recipe: props.location.recipeProps.recipe
    }

    console.log("recipe: ", this.state.recipe);
    console.log("ingredient: ", this.state.ingredient);
  }

  async componentDidMount() {
    console.log("recipeList componentDidMount");
    if (this.state.ingredient) {
      let list = await this.state.recipeService.getIngredient(this.state.ingredient);
      console.log("getIngredient List: ");
      console.log(list);
      this.setState({
        list: list
      });
    }
    if (this.state.recipe) {
      let listRecipe = await this.state.recipeService.getRecipe(this.state.recipe);
      this.setState({
        list: listRecipe
      });

      console.log("list: ", this.state.list);
    }
  }

  render() {
    return (
      <div className="list-container">
        <div className="info-box">
          {
            this.state.ingredient ? (<div className="ingredient-box"><p>{this.state.ingredient}</p></div>) : <div></div>
          }
          
          {
            this.state.recipe ? (<div className="recipe-box">{this.state.recipe}</div>) : <div></div>
          }
          <Link to="/">
            <img className="generate-another" src={GenerateAnother} alt="generate another recipe"/>
          </Link>
        </div>
        <div className="recipe-list">
          <div className="row">
            {
              this.state.list ? this.state.list.map((recipeObj, index) => {
                return (<RecipeCard key={index} recipeList={this.state.list} recipe={recipeObj} inputRecipe={this.state.recipe} inputIngredient={this.state.ingredient}/>);
              }) : <div></div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeList;