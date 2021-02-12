import React, { Component } from 'react';
import RecipeCard from '../recipes/RecipeCard';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../actions';

class Favorites extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    return (
      <div>
        {
          this.props.recipes ? this.props.recipes.map((recipeObj, index) => {
            return (<RecipeCard
                      key={index} 
                      recipe={recipeObj} 
                      inputRecipe="{this.state.recipe}"
                      inputIngredient="{this.state.ingredient}"
                      inputCategory="{this.state.category}"
                      inputCuisine="{this.state.cuisine}"
                      inputAlphabet="{this.state.alphabet}"
                    />);
          }) : <div></div>
        }
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchRecipes })(Favorites);