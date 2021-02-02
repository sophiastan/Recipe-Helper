import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import AuthService from '../services/AuthService';

import Header from './Header';
import Home from './Home';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';

class App extends Component {
  // constructor(props) {
  //   super();

  //   this.state = {
  //     authService: new AuthService()
  //   }
  // }

  // async componentDidMount() {
  //   let user = await this.state.authService.fetchUser();
  //   if (user) {
  //     console.log(user);
  //   }
  // }

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
}

export default App;