import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultBack from '../../images/back-default.png';
import defaultLink from '../../images/link-default.png';
import defaultHeart from '../../images/heart-default.png';
import activeHeart from '../../images/heart-active.png';
import defaultBookmark from '../../images/bookmark-default.png';
import activeBookmark from '../../images/bookmark-active.png';
import defaultShare from '../../images/share-default.png';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import Modal from 'react-bootstrap/Modal';
import RecipeService from '../../services/RecipeService';

class RecipeDetails extends Component{
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      inputIngredient: props.location.recipeProps.inputIngredient,
      inputRecipe: props.location.recipeProps.inputRecipe,
      inputCategory: props.location.recipeProps.inputCategory,
      inputCuisine: props.location.recipeProps.inputCuisine,
      recipeList: props.location.recipeProps.recipeList,
      recipeID: props.location.recipeProps.recipeID,
      recipe: {},

      heartClicked: false,
      bookmarkClicked: false,
      showModal: false
    }
    // if (props.location.recipeProps) {
    //   this.setState({
    //     inputIngredient: props.location.recipeProps.inputIngredient,
    //     inputRecipe: props.location.recipeProps.inputRecipe,
    //     inputCategory: props.location.recipeProps.inputCategory,
    //     inputCuisine: props.location.recipeProps.inputCuisine,
    //     recipeList: props.location.recipeProps.recipeList,
    //     recipeID: props.location.recipeProps.recipeID,
    //     randomClicked: props.location.randomClicked
    //   })
    // }
    console.log(this.state.recipeID);
    // console.log("random Clicked: ", props.location.randomClicked);
  }

  async componentDidMount() {
    console.log("RecipeDetails from recipeID componentDidMount " + this.state.recipeID);
    if (this.state.recipeID) {
      let recipe = await this.state.recipeService.getRecipeByID(this.state.recipeID);
      this.setState({
        recipe: recipe
      });
    }
    // else {
    //   let recipe = await this.state.recipeService.getRandomRecipe();
    //   this.setState({
    //     recipe: recipe
    //   });
    // }
    // else if (this.props.location.randomClicked) {
    //   let recipe = await this.state.recipeService.getRandomRecipe();
    //   this.setState({
    //     recipe: recipe
    //   });
    // }
    
    let ingredientList = [];
    let measureList = [];
    for (let [key,value] of Object.entries(this.state.recipe)) {
      if (key.includes("strIngredient")) {
        if (value !== '' && value !== ' ' && value !== null) 
          ingredientList.push(value);
      }
      else if (key.includes("strMeasure")) {
        if (value !== '' && value !== ' ' && value !== null) 
          measureList.push(value);
      }
    }
    this.setState({
      ingredientList: ingredientList,
      measureList: measureList
    })
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
              recipe: this.state.inputRecipe,
              category: this.state.inputCategory,
              cuisine: this.state.inputCuisine
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
          <p>Youtube:</p><a href={this.state.recipe.strYoutube}>{this.state.recipe.strYoutube}</a>
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
          <div className="detail-ing-box">
            {
              this.state.ingredientList ? this.state.ingredientList.map((ing, index) => (
                <div className="detail-ing" key={index}>{ing}</div>
              )) : <div></div>
            }
          </div>
          <div className="detail-ing-box">
          {
            this.state.measureList ? this.state.measureList.map((measure, index) => (
              <div className="detail-ing" key={index}>{measure}</div>
            )) : <div></div>
          }
        </div>
        </div>
      </div>
    );
  }
}
export default RecipeDetails;