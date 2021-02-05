import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import RecipeCard from './RecipeCard';
import defaultBack from '../images/back-default.png';
import defaultLink from '../images/link-default.png';
import defaultHeart from '../images/heart-default.png';
import activeHeart from '../images/heart-active.png';
import defaultBookmark from '../images/bookmark-default.png';
import activeBookmark from '../images/bookmark-active.png';
import defaultShare from '../images/share-default.png';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import Modal from 'react-bootstrap/Modal';
import RecipeService from '../services/RecipeService';

class RecipeDetails extends Component{
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      inputIngredient: props.location.recipeProps.inputIngredient,
      inputRecipe: props.location.recipeProps.inputRecipe,
      recipeList: props.location.recipeProps.recipeList,
      recipeID: props.location.recipeProps.recipeID,
      recipe: {},

      heartClicked: false,
      bookmarkClicked: false,
      showModal: false
    }

    console.log("Input ingredients recipe details: ", this.state.inputIngredient);
  }

  async componentDidMount() {
    console.log("RecipeDetails from recipeID componentDidMount " + this.state.recipeID);
    if (this.state.recipeID) {
      let recipe = await this.state.recipeService.getRecipeByID(this.state.recipeID);
      console.log("getRecipeByID recipe: ", recipe);
      this.setState({
        recipe: recipe
      });
    }

    console.log("recipe title: ", this.state.recipe.strMeal);
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

  shareRecipe = (event) => {
    this.setState({ showModal: true})
    event.stopPropagation();
  }

  handleClose = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div>
        <Link to={{
            pathname: "/recipes",
            recipeProps: {
              ingredient: this.state.inputIngredient,
              recipe: this.state.inputRecipe
            }}}>
            <img src={defaultBack} className="back" alt="back button"/>
          </Link>
        <div className="top-detail">
          <div className="top-detail-above">
            <img src={this.state.recipe.strMealThumb} className="detail-img" alt="thumbnail"/>
            <a  href={this.state.recipe.strSource ? this.state.recipe.strSource : ""}>
              <img src={defaultLink} className="link" alt="link button"/>
            </a>
          </div>
          <p className="detail-title">{this.state.recipe.strMeal}</p>
          <p>Category: {this.state.recipe.strCategory}</p>
          <p>Area: {this.state.recipe.strArea}</p>
          <p>Youtube: {this.state.recipe.strYoutube}</p>
          <div className="icon-box">
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
            <img
              src={defaultShare}
              className="detail-share"
              alt="share"
              onClick={this.shareRecipe}
            />
            <Modal show={this.state.showModal} onHide={this.handleClose}> 
              <Modal.Header closeButton>
                <Modal.Title>{this.state.recipe.strMeal}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ textAlign: 'center' }}>
                <h5>Share via</h5>
                <FacebookShareButton data-tip data-for="fb" url={this.state.recipe.strSource}><FacebookIcon size={50} round /></FacebookShareButton>
                <TwitterShareButton data-tip data-for="twitter" url={this.state.recipe.strSource}><TwitterIcon size={50} round /></TwitterShareButton>
                <EmailShareButton data-tip data-for="email" subject="Recipup" url={this.state.recipe.strSource}><EmailIcon size={50} round /></EmailShareButton>
              </Modal.Body>
            </Modal>
          </div>
          <p>Instructions: {this.state.recipe.strInstructions}</p>
        </div>
      </div>
    );
  }
}
export default RecipeDetails;