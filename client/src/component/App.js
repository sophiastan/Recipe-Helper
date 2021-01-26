import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={RecipeList} />
          <Route exact path="/recipes/details" component={RecipeDetails} />
        </div>
      </BrowserRouter>
    )
  }
};

export default App;