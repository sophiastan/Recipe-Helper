import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';

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
          <Route exact path="/recipes/:recipeID" component={RecipeDetails} />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App);