import React, { Component } from 'react';
import RecipeService from '../../services/RecipeService';
import { connect } from 'react-redux';
import { saveRecipe } from '../../actions';
import { Link } from 'react-router-dom';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import Modal from 'react-bootstrap/Modal';
import heartDefault from '../../images/details-heart-default.png';
import heartActive from '../../images/details-heart-active.png';
import shareDefault from '../../images/details-share-default.png';
// import shareActive from '../../images/details-share-active.png';
import linkDefault from '../../images/details-link-default.png';
import youtubeDefault from '../../images/details-youtube-default.png';

class RecipeDetails extends Component{
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      inputIngredient: props.location.recipeProps.inputIngredient,
      inputRecipe: props.location.recipeProps.inputRecipe,
      inputCategory: props.location.recipeProps.inputCategory,
      inputCuisine: props.location.recipeProps.inputCuisine,
      inputAlphabet: props.location.recipeProps.inputAlphabet,
      recipeID: props.location.recipeProps.recipeID,
      recipe: {},

      isFavorited: false || props.location.recipeProps.isFavorited,
      showModal: false,
      showFavorite: false
    }
  }

  async componentDidMount() {
    if (this.state.recipeID) {
      let recipe = await this.state.recipeService.getRecipeByID(this.state.recipeID);
      this.setState({
        recipe: recipe
      });
      console.log(recipe);
    }
    
    let ingredientList = [];
    let measureList = [];
    for (let [key,value] of Object.entries(this.state.recipe)) {
      if (key.includes('strIngredient')) {
        if (value !== '' && value !== ' ' && value !== null) 
          ingredientList.push(value);
      }
      else if (key.includes('strMeasure')) {
        if (value !== '' && value !== ' ' && value !== null) 
          measureList.push(value);
      }
    }

    if (measureList.length === ingredientList.length) {
      let ingredients = [];
      let length = measureList.length;
      for (let i = 0; i < length; i++) {
        ingredients.push(measureList[i] + ' ' + ingredientList[i]);
      }
      
      let newIngredients = [];
      for (let i = 0; i < length; i++) {
        newIngredients.push(ingredients[i].replace(/ + /g, ' '));
      }
      this.setState({
        ingredients: newIngredients
      })
    }
  }

  onFavoriteClick = () => {
    if (this.state.isFavorited) {
      this.setState({
        isFavorited: false
      });
    }
    else {
      this.setState({
        isFavorited: true,
        showFavorite: true
      });

      this.props.saveRecipe(
        this.state.recipe.idMeal, 
        this.state.recipe.strMeal, 
        this.state.recipe.strMealThumb,
        this.state.isFavorited
      );
    }
  }

  shareRecipe = (event) => {
    this.setState({ showModal: true})
    event.stopPropagation();
  }

  handleClose = () => {
    this.setState({ 
      showModal: false,
      showFavorite: false 
    })
  }

  render() {
    return (
      <div id='details-container'>
        <h2>{this.state.recipe.strMeal}</h2>
        <h6 style={{ color: '#606060', marginTop: '0.5rem' }}>{this.state.recipe.strCategory} | {this.state.recipe.strArea}</h6>
        <div id='details-content'>
          <div style={{ float: 'left' }}>
            <img src={this.state.recipe.strMealThumb} style={{ borderRadius: '0.5rem', width: '29.625rem', height: '29.625rem' }} alt='thumbnail' />
            <div id='icon-list'>
              <img src={this.state.isFavorited ? heartActive : heartDefault} 
                className='icon' onClick={this.onFavoriteClick} alt='icon' />
              <img src={shareDefault} className='icon' onClick={this.shareRecipe} alt='icon' />
              <a href={this.state.recipe.strYoutube}>
                <img src={youtubeDefault} className='icon' alt='icon' />
              </a>
              <a  href={this.state.recipe.strSource ? this.state.recipe.strSource : ''}>
                <img src={linkDefault} className='icon' alt='icon' />
              </a>
            </div>
          </div>
          <div id='ingredients'>
            <h5 style={{ color: '#fc621b' }}>Ingredients</h5>
            <div style={{ marginTop: '3.25rem' }}>
              {
                this.state.ingredients ? this.state.ingredients.map((ing, index) => (
                  <li key={index}>{ing}</li>
                )) : <div></div>
              }
            </div>
          </div>
          <div id='instructions'>
            <h5 style={{ color: '#fc621b' }}>Instructions</h5>
            <p style={{ marginTop: '3.25rem' }}>{this.state.recipe.strInstructions}</p>
          </div>
          <Modal show={this.state.showModal} onHide={this.handleClose}> 
              <Modal.Header closeButton>
                <Modal.Title>{this.state.recipe.strMeal}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ textAlign: 'center' }}>
                <h5>Share via</h5>
                <FacebookShareButton data-tip data-for='fb' url={this.state.recipe.strSource}><FacebookIcon size={50} round /></FacebookShareButton>
                <TwitterShareButton data-tip data-for='twitter' url={this.state.recipe.strSource}><TwitterIcon size={50} round /></TwitterShareButton>
                <EmailShareButton data-tip data-for='email' subject='Recipup' url={this.state.recipe.strSource}><EmailIcon size={50} round /></EmailShareButton>
              </Modal.Body>
            </Modal>
            <Modal show={this.state.showFavorite} onHide={this.handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <h5>You saved <b>{this.state.recipe.strMeal}</b> to your <Link to='/favorites'>Favorites</Link>.</h5>
              </Modal.Body>
            </Modal>
        </div>
      </div>
      // <div>
      //   <Link to={{
      //       pathname: '/recipes',
      //       recipeProps: {
      //         ingredient: this.state.inputIngredient,
      //         recipe: this.state.inputRecipe,
      //         category: this.state.inputCategory,
      //         cuisine: this.state.inputCuisine,
      //         alphabet: this.state.inputAlphabet
      //       }}}>
      //       <img src={defaultBack} className='back' alt='back button'/>
      //     </Link>
      //   <div className='top-detail'>
      //     <div className='top-detail-above'>
      //       <img src={this.state.recipe.strMealThumb} className='detail-img' alt='thumbnail'/>
      //       <a  href={this.state.recipe.strSource ? this.state.recipe.strSource : ''}>
      //         <img src={defaultLink} className='link' alt='link button'/>
      //       </a>
      //     </div>
      //     <p className='detail-title'>{this.state.recipe.strMeal}</p>
      //     <p>Category: {this.state.recipe.strCategory}</p>
      //     <p>Area: {this.state.recipe.strArea}</p>
      //     <p>Youtube:</p><a href={this.state.recipe.strYoutube}>{this.state.recipe.strYoutube}</a>
      //     <div className='icon-box'>
      //       <img 
      //           src={this.state.heartClicked ? activeHeart : defaultHeart} 
      //           className='detail-heart'
      //           alt='heart' 
      //           onClick={this.onHeartClick}/>
      //       <img 
      //         src={this.state.isFavorited ? activeBookmark : defaultBookmark} 
      //         className='detail-bookmark'
      //         alt='bookmark' 
      //         onClick={this.onBookmarkClick}/>
      //       <img
      //         src={defaultShare}
      //         className='detail-share'
      //         alt='share'
      //         onClick={this.shareRecipe}
      //       />
            // <Modal show={this.state.showModal} onHide={this.handleClose}> 
            //   <Modal.Header closeButton>
            //     <Modal.Title>{this.state.recipe.strMeal}</Modal.Title>
            //   </Modal.Header>
            //   <Modal.Body style={{ textAlign: 'center' }}>
            //     <h5>Share via</h5>
            //     <FacebookShareButton data-tip data-for='fb' url={this.state.recipe.strSource}><FacebookIcon size={50} round /></FacebookShareButton>
            //     <TwitterShareButton data-tip data-for='twitter' url={this.state.recipe.strSource}><TwitterIcon size={50} round /></TwitterShareButton>
            //     <EmailShareButton data-tip data-for='email' subject='Recipup' url={this.state.recipe.strSource}><EmailIcon size={50} round /></EmailShareButton>
            //   </Modal.Body>
            // </Modal>
            // <Modal show={this.state.showFavorite} onHide={this.handleClose}>
            //   <Modal.Header closeButton></Modal.Header>
            //   <Modal.Body>
            //     <h5>You saved <b>{this.state.recipe.strMeal}</b> to your <Link to='/favorites'>Favorites</Link>.</h5>
            //   </Modal.Body>
            // </Modal>
      //     </div>
      //     <p>Instructions: {this.state.recipe.strInstructions}</p>
      //     <div className='detail-ing-box'>
      //     {
      //       this.state.ingredients ? this.state.ingredients.map((ing, index) => (
      //         <div className='detail-ing' key={index}>{ing}</div>
      //       )) : <div></div>
      //     }
      //   </div>
      //   </div>
      // </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveRecipe: (recipeID, title, thumbnail) => dispatch(saveRecipe(recipeID, title, thumbnail))
});

export default connect(null, mapDispatchToProps)(RecipeDetails);