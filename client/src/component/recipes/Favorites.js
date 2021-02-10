import React, { Component } from 'react';
import RecipeService from '../../services/RecipeService';
import RecipeCard from '../recipes/RecipeCard';
import { connect } from 'react-redux';

class Favorites extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      list: []
    }
  }

  render() {
    return (
      <div>
        {
          this.state.list ? this.state.list.map((recipeObj, index) => {
            return (<RecipeCard
                      key={index} 
                      recipeList={this.state.list} 
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

export default connect(mapStateToProps)(Favorites);