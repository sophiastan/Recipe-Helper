import React, { Component } from 'react';
import RecipeCard from '../recipes/RecipeCard';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../actions';
import Row from 'react-bootstrap/Row';

class Favorites extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    console.log("recipes: ", this.props.recipes);
    return (
      <div id="list-container">
        <h3 style={{ marginLeft: "10px" }}>Favorites</h3>
        <Row style={{ marginTop: "60px", marginLeft: "10px" }}>
          {
            this.props.recipes ? this.props.recipes.map((recipeObj, index) => {
            return (
              <RecipeCard
                key={index} 
                recipe={recipeObj} 
                isFavorited={true}
                inputRecipe="{this.state.recipe}"
                inputIngredient="{this.state.ingredient}"
                inputCategory="{this.state.category}"
                inputCuisine="{this.state.cuisine}"
                inputAlphabet="{this.state.alphabet}"
              />);
            }) : <div></div>
          }
        </Row>
      </div>
    )
  }
}

function mapStateToProps({ recipes }) {
  return { recipes };
}

export default connect(mapStateToProps, { fetchRecipes })(Favorites);