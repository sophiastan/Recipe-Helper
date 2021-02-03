import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import defaultBack from '../images/back-default.png';
import defaultLink from '../images/link-default.png';
import defaultHeart from '../images/heart-default.png';
import activeHeart from '../images/heart-active.png';
import defaultBookmark from '../images/bookmark-default.png';
import activeBookmark from '../images/bookmark-active.png';
import defaultShare from '../images/share-default.png';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import Modal from 'react-bootstrap/Modal';

class RecipeDetails extends Component{
  constructor(props) {
    super();

    const inputIngredients = props.location.recipeProps.inputIngredients;
    console.log("input ING: ", inputIngredients);

    const inputRecipe = props.location.recipeProps.inputRecipe;
    console.log("input Recipe: ", inputRecipe);

    const recipeList = props.location.recipeProps.recipeList;
    console.log("recipe List: ", recipeList);

    this.state = {
      recipeList: props.location.recipeProps.recipeList,
      inputIngredients: props.location.recipeProps.inputIngredients,
      inputRecipe: props.location.recipeProps.inputRecipe,
      title: props.location.recipeProps.title,
      href: props.location.recipeProps.href,
      ingredients: props.location.recipeProps.ingredients,
      thumbnail: props.location.recipeProps.thumbnail,

      heartClicked: false,
      bookmarkClicked: false,
      showModal: false
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
              ingredients: this.state.inputIngredients,
              recipe: this.state.inputRecipe
            }}}>
            <img src={defaultBack} className="back" alt="back button"/>
          </Link>
        <div className="top-detail">
          <div className="top-detail-above">
            <img src={this.state.thumbnail} className="detail-img" alt="thumbnail"/>
            <a  href={this.state.href}>
              <img src={defaultLink} className="link" alt="link button"/>
            </a>
          </div>
          <p className="detail-title">{this.state.title}</p>
          <div className="detail-ing-box">
            {
              this.state.ingredients ? this.state.ingredients.map((ing, index) => (
                <div className="detail-ing" key={index}>{ing}</div>
              )) : <h2>no results!</h2>
            }
          </div>
          <div className="detail-ogING-box">
            {
              this.state.inputIngredients ? this.state.inputIngredients.map((ing, index) => (
                <div className="detail-ogING" key={index}>{ing}</div>
              )) : <h2>no results!</h2>
            }
          </div>
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
                <Modal.Title>{this.state.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ textAlign: 'center' }}>
                <h5>Share via</h5>
                <FacebookShareButton data-tip data-for="fb" url={this.state.href}><FacebookIcon size={50} round /></FacebookShareButton>
                <TwitterShareButton data-tip data-for="twitter" url={this.state.href}><TwitterIcon size={50} round /></TwitterShareButton>
                <EmailShareButton data-tip data-for="email" subject="Recipup" url={this.state.href}><EmailIcon size={50} round /></EmailShareButton>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        {/* <p className="more">More generated recipes</p> */}
        <div className="recipe-list">
          <div className="row">
            {
              this.state.recipeList ? this.state.recipeList.map((recipeObj, index) => {
                return (<RecipeCard key={index} recipeList={this.state.recipeList} recipe={recipeObj} inputRecipe={this.state.inputRecipe} inputIngredients={this.state.inputIngredients}/>);
              }) : <h2>no results!</h2>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default RecipeDetails;