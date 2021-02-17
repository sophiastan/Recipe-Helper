import React, { Component } from 'react';
import RecipeService from '../../services/RecipeService';
import RecipeCard from './RecipeCard';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class RecipeList extends Component {
  constructor(props) {
    super();

    this.state = {
      recipeService: new RecipeService(),
      ingredient: props.location.recipeProps.ingredient ? props.location.recipeProps.ingredient : '',
      recipe: props.location.recipeProps.recipe ? props.location.recipeProps.recipe : '',
      category: props.location.recipeProps.category ? props.location.recipeProps.category : '',
      cuisine: props.location.recipeProps.cuisine ? props.location.recipeProps.cuisine : '',
      isAlphabet: props.location.recipeProps.isAlphabet ? props.location.recipeProps.isAlphabet : false,
      alphabet: 'A'
    }
    console.log("Recipe List alphabet: ", this.state.alphabet);
    console.log("Recipe List isAlphabet: ", this.state.isAlphabet);

    // console.log("recipe: ", this.state.recipe);
    // console.log("ingredient: ", this.state.ingredient);
    // console.log("category: ", this.state.category);
    // console.log("cuisine: ", this.state.cuisine);
    // console.log("alphabet: ", this.state.alphabet);
  }

  async componentDidMount() {
    console.log("recipeList componentDidMount");
    if (this.state.ingredient) {
      let list = await this.state.recipeService.getIngredient(this.state.ingredient);
      this.setState({
        list: list
      });
    }
    if (this.state.recipe) {
      let listRecipe = await this.state.recipeService.getRecipe(this.state.recipe);
      this.setState({
        list: listRecipe
      });
    }
    if (this.state.category) {
      let listCategory = await this.state.recipeService.getCategory(this.state.category);
      this.setState({
        list: listCategory
      });
    }
    if (this.state.cuisine) {
      let listCuisine = await this.state.recipeService.getCuisine(this.state.cuisine);
      this.setState({
        list: listCuisine
      });
    }
    if (this.state.alphabet && !this.state.recipe && !this.state.ingredient) {
      let listLetter = await this.state.recipeService.getFirstLetter(this.state.alphabet);
      this.setState({
        list: listLetter
      })
    }

    console.log("list: ", this.state.list);
  }

  onChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
      [name]: val
    });

    // let listLetter = this.state.recipeService.getFirstLetter(this.state.alphabet);
    // console.log(listLetter);
    // this.setState({
    //   list: listLetter
    // });
  }

  prepareAlphabets = () => {
    let result = [];
    for(let i=65; i<91; i++) {
      result.push(
        <Button type="button" key={i} name="alphabet" onClick={this.onChange} value={String.fromCharCode(i)} className="letter" >
          {String.fromCharCode(i)}
        </Button>
      )
    }
    return result;
  }

  render() {
    return (
      <div>
        {
          this.state.isAlphabet ? 
          <ButtonGroup size="lg" style={{ paddingTop: '2.4rem', marginLeft: '10.6rem' }}>
            {this.prepareAlphabets()}
          </ButtonGroup> : <div></div>
        }
        <div id='list-container'>
          { (this.state.ingredient || this.state.recipe || this.state.category || this.state.cuisine || this.state.alphabet) ?
            <h3 style={{ marginLeft: '10px' }}>
              {this.state.ingredient || this.state.recipe || this.state.category || this.state.cuisine || this.state.alphabet}
            </h3> 
            : <div></div>
          }
          <Row style={{ marginTop: '60px', marginLeft: '10px' }}>
            {
              this.state.list ? this.state.list.map((recipeObj, index) => {
                return (
                  <RecipeCard 
                    key={index} 
                    recipe={recipeObj} 
                    inputRecipe={this.state.recipe} 
                    inputIngredient={this.state.ingredient}
                    inputCategory={this.state.category}
                    inputCuisine={this.state.cuisine}
                    inputAlphabet={this.state.alphabet}
                  />);
              }) : <div></div>
            }
          </Row>
        </div>
      </div>
    );
  }
}

export default RecipeList;