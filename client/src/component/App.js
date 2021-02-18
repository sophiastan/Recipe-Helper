import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import RecipeList from './recipes/RecipeList';
import RecipeDetails from './recipes/RecipeDetails';
import Favorites from './recipes/Favorites';
import Ingredient from './recipes/Ingredient';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={RecipeList} />
          {/* <Route exact path={["/recipes/:recipeID", "/random"]} component={RecipeDetails} /> */}
          <Route exact path="/recipes/:recipeID" component={RecipeDetails} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/ingredient" component={Ingredient} />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App);