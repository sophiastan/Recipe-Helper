import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    )
  }
};

export default App;