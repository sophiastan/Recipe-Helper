import React, { Component } from 'react';
import defaultHeart from '../../images/heart-default.png';
import activeHeart from '../../images/heart-active.png';
// import mouseHeart from '../images/heart-mouseOn.png';
import defaultBookmark from '../../images/bookmark-default.png';
import activeBookmark from '../../images/bookmark-active.png';
// import mouseBookmark from '../images/bookmark-mouseOn.png';
import { Link } from 'react-router-dom';

class RecipeCard extends Component{
  constructor(props) {
    super();
    // console.log("recipe: ", props.recipe);

    this.state = {
      inputIngredient: props.inputIngredient,
      inputRecipe: props.inputRecipe,
      inputCategory: props.inputCategory,
      inputCuisine: props.inputCuisine,
      recipeList: props.recipeList,
      title: props.recipe.strMeal,
      thumbnail: props.recipe.strMealThumb,
      recipeID: props.recipe.idMeal,

      heartClicked: false,
      bookmarkClicked: false
    }
  }

  onHeartClick = () => {
    if (this.state.heartClicked) {
      this.setState({
        heartClicked: false
      });
    }
    else {
      this.setState({
        heartClicked: true
      });
    }
  }

  onBookmarkClick = () => {
    if (this.state.bookmarkClicked) {
      this.setState({
        bookmarkClicked: false
      });
    }
    else {
      this.setState({
        bookmarkClicked: true
      });
    }
  }

  render() {
    return (
      <div className="col-lg-2.5">
        <div className="card">
          <Link style ={{textDecoration: 'none'}} to ={{
            pathname: `/recipes/${this.state.recipeID}`,
            recipeProps: {
              inputIngredient: this.state.inputIngredient,
              inputRecipe: this.state.inputRecipe,
              inputCategory: this.state.inputCategory,
              inputCuisine: this.state.inputCuisine,
              recipeList: this.state.recipeList,
              recipeID: this.state.recipeID
          }}}>
            <div className="top-card">
              <p className="recipe-title">{this.state.title}</p>
              <img className="list-img" src={this.state.thumbnail} alt="img"/>
            </div>
          </Link>
          <div className="bot-card">
            <img 
              src={this.state.heartClicked ? activeHeart : defaultHeart} 
              className="heart"
              alt="liked heart" 
              onClick={this.onHeartClick}/>
            <img 
              src={this.state.bookmarkClicked ? activeBookmark : defaultBookmark} 
              className="bookmark"
              alt="bookmark" 
              onClick={this.onBookmarkClick}/>
          </div>
        </div>
      </div>
    );
  }
}
export default RecipeCard;