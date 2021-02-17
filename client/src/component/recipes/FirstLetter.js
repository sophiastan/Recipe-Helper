import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import RecipeList from '../recipes/RecipeList';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class FirstLetter extends Component {
  constructor(props) {
    super();

    this.state = {
      alphabet: "A"
    }
  }

  onChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
      [name]: val
    });
  }

  prepareAlphabets = () => {
    let result = [];
    for(let i=65; i<91; i++) {
      result.push(
        <Button type="button" key={i} name="alphabet" onClick={this.onChange} value={String.fromCharCode(i)} variant="outline-secondary" >
          {String.fromCharCode(i)}
        </Button>
      )
    }
    console.log("First Letter: ", this.state.alphabet);
    return result;
  }

  render() {
    return (
      <div>
        <ButtonGroup size="lg" style={{ paddingTop: "40px" }}>
          {this.prepareAlphabets()}
        </ButtonGroup>
        <RecipeList alphabet={this.state.alphabet} />
      </div>
    )
  }
}

export default FirstLetter;