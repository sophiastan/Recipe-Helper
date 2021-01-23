import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
// import RecipeNew from './RecipeNew';
import RecipeList from './RecipeList';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/recipe" component={RecipeList} />
        </div>
      </BrowserRouter>
    )
  }
};

export default App;