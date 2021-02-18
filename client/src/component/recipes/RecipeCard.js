import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveRecipe, deleteRecipe } from '../../actions';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import heartDefault from '../../images/card-heart-default.png';
import heartActive from '../../images/card-heart-active.png';

class RecipeCard extends Component{
  constructor(props) {
    super();
    // console.log('recipe: ', props.recipe);

    this.state = {
      inputIngredient: props.inputIngredient,
      inputRecipe: props.inputRecipe,
      inputCategory: props.inputCategory,
      inputCuisine: props.inputCuisine,
      inputAlphabet: props.inputAlphabet,
      title: props.recipe.strMeal,
      thumbnail: props.recipe.strMealThumb,
      recipeID: props.recipe.idMeal,
      recipe: props.recipe,

      isFavorited: false || props.isFavorited,
      showFavorite: false
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.recipe !== this.state.recipe) {
      this.setState({
        title: this.state.recipe.strMeal,
        thumbnail: this.state.recipe.strMealThumb
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.recipe  !== props.recipe) {
      return {
        recipe: props.recipe
      };
    }
    return null;
  }

  onBookmarkClick = (event) => {
    if (this.state.isFavorited) {
      this.setState({
        isFavorited: false
      });
      // this.props.deleteRecipe('52907');
    }
    else {
      this.setState({
        isFavorited: true,
        showFavorite: true
      });
      this.props.saveRecipe(this.state.recipeID, this.state.title, this.state.thumbnail, this.state.isFavorited);
    }
    event.stopPropagation();
  }

  handleClose = () => {
    this.setState({ showFavorite: false })
  }

  render() {
    return (
      <Col style={{ padding: '0px 20px 22px 0px' }} lg={3.5}>
        <Card bg='transparent' style={{ width: '19rem', border: 'none' }}>
          <Link style ={{textDecoration: 'none'}} to ={{
            pathname: `/recipes/${this.state.recipeID || this.props.recipe.ID}`,
            recipeProps: {
              inputIngredient: this.state.inputIngredient,
              inputRecipe: this.state.inputRecipe,
              inputCategory: this.state.inputCategory,
              inputCuisine: this.state.inputCuisine,
              inputAlphabet: this.state.inputAlphabet,
              recipeID: this.state.recipeID || this.props.recipe.ID, 
              isFavorited: this.props.isFavorited
          }}}>
            <Card.Img 
              style={{ borderRadius: '0.7rem' }} 
              src={this.state.thumbnail || this.props.recipe.thumbnail} />
          </Link>
          <Card.Body style={{ padding: '1rem 0.3rem 0.3rem' }}>
            <Card.Title style={{ float: 'left', maxWidth: '15.75rem', fontSize: '1rem' }}>{this.state.title || this.props.recipe.title}</Card.Title>
            <Card.Img 
              src={this.state.isFavorited ? heartActive : heartDefault} 
              className='bookmark'
              alt='favorite' 
              onClick={this.onBookmarkClick} />
          </Card.Body>
        </Card>
        <Modal show={this.state.showFavorite} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <h5>You saved <b>{this.state.title}</b> to your <Link to='/favorites'>Favorites</Link>.</h5>
          </Modal.Body>
        </Modal>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveRecipe: (recipeID, title, thumbnail) => dispatch(saveRecipe(recipeID, title, thumbnail)),
  deleteRecipe: (recipeID) => dispatch(deleteRecipe(recipeID))
});

export default connect(null, mapDispatchToProps)(RecipeCard);