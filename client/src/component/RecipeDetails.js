import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultBack from '../images/back-default.png';
import defaultLink from '../images/link-default.png';
import defaultHeart from '../images/heart-default.png';
import activeHeart from '../images/heart-active.png';
import defaultBookmark from '../images/bookmark-default.png';
import activeBookmark from '../images/bookmark-active.png';

class RecipeDetails extends Component{
  constructor(props) {
    super();

    const ingredients = props.location.recipeProps.ingredients;

    for (let ing of ingredients) {
      console.log("ingredient: ", ing);
    }

    const ogIngredients = props.location.recipeProps.ogIngredients;

    console.log("OG ING: ", ogIngredients);

    this.state = {
      ogIngredients: props.location.recipeProps.ogIngredients,
      title: props.location.recipeProps.title,
      href: props.location.recipeProps.href,
      ingredients: props.location.recipeProps.ingredients,
      thumbnail: props.location.recipeProps.thumbnail,

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
      <div>
        <div className="top-detail">
          <Link to="/recipes">
            <img src={defaultBack} className="back" alt="back button"/>
          </Link>
          <img src={this.state.thumbnail} className="detail-img" alt="thumbnail"/>
          <Link to ={this.state.href}>
            <img src={defaultLink} className="link" alt="link button"/>
          </Link>
          <p className="detail-title">{this.state.title}</p>
          {
            this.state.ogIngredients ? this.state.ogIngredients.map((ing, index) => (
              <div className="detail-ogING" key={index}>{ing}</div>
            )) : <h2>no results!</h2>
          }
          {
            this.state.ingredients ? this.state.ingredients.map((ing, index) => (
              <div className="detail-ing" key={index}>{ing}</div>
            )) : <h2>no results!</h2>
          }
          <img 
              src={this.state.heartClicked ? activeHeart : defaultHeart} 
              className="detail-heart"
              alt="heart" 
              onClick={this.onHeartClick}/>
          <img 
            src={this.state.bookmarkClicked ? activeBookmark : defaultBookmark} 
            className="detail-bookmark"
            alt="bookmark" 
            onClick={this.onBookmarkClick}/>
        </div>
      </div>
    );
  }
}
export default RecipeDetails;