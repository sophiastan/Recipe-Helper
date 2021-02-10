import React, { Component } from 'react';
import RecipeService from '../../services/RecipeService';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import GenerateAnother from '../../images/generate-another-button.png';

class RecipeList extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredient: props.location.recipeProps.ingredient,
      recipe: props.location.recipeProps.recipe,
      category: props.location.recipeProps.category,
      cuisine: props.location.recipeProps.cuisine,
      alphabet: props.location.recipeProps.alphabet
    }

    // console.log("recipe: ", this.state.recipe);
    // console.log("ingredient: ", this.state.ingredient);
    // console.log("category: ", this.state.category);
    // console.log("cuisine: ", this.state.cuisine);
    // console.log("alphabet: ", this.state.alphabet);
  }

  async componentDidMount() {
    console.log("recipeList componentDidMount");
    if (this.state.ingredient) {
      let list = await this.state.recipeService.getIngredient(this.state.ingredient);
      this.setState({
        list: list
      });
    }
    if (this.state.recipe) {
      let listRecipe = await this.state.recipeService.getRecipe(this.state.recipe);
      this.setState({
        list: listRecipe
      });
    }
    if (this.state.category) {
      let listCategory = await this.state.recipeService.getCategory(this.state.category);
      this.setState({
        list: listCategory
      });
    }
    if (this.state.cuisine) {
      let listCuisine = await this.state.recipeService.getCuisine(this.state.cuisine);
      this.setState({
        list: listCuisine
      });
    }
    if (this.state.alphabet) {
      let listLetter = await this.state.recipeService.getFirstLetter(this.state.alphabet);
      this.setState({
        list: listLetter
      })
    }

    console.log("list: ", this.state.list);
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
                return (<RecipeCard 
                          key={index} 
                          recipeList={this.state.list} 
                          recipe={recipeObj} 
                          inputRecipe={this.state.recipe} 
                          inputIngredient={this.state.ingredient}
                          inputCategory={this.state.category}
                          inputCuisine={this.state.cuisine}
                          inputAlphabet={this.state.alphabet}
                        />);
              }) : <div></div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeList;