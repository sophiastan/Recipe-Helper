import React, { Component } from 'react';

class RecipeCard extends Component{
  constructor(props) {
    super();
    // console.log("recipeObj: ");
    // console.log(props.recipe.title);

    this.state = {
      title: props.recipe.title,
      href: props.recipe.href,
      ingredients: props.recipe.title,
      thumbnail: props.recipe.thumbnail,
    }
  }
  render() {
    return (
      <div>
        <img className="img-list" src={this.state.thumbnail} alt="img"/>
        <div className="details">
          <div className="recipe-title">{this.state.title}</div>
        </div>
      </div>
    );
  }
}
export default RecipeCard;