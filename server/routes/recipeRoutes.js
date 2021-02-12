const mongoose = require('mongoose');
const fetch = require('node-fetch');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');

module.exports = app => {
  const baseUrl = "https://www.themealdb.com/api/json/v1/1";

  // Retrieves a list of recipes from ingredient 
  app.get('/getIngredient/:ingredient', async function (req, res) {
    const endpoint = "/filter.php?i=" + req.params.ingredient;
    console.log("SERVER INGREDIENT: ", req.params.ingredient);
    console.log("URL: ", baseUrl + endpoint);
    const recipe = await fetch(baseUrl + endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    const data = await recipe.json();
    console.log(data.meals);
    res.json(data.meals);
  });

  // Retrieves recipe details from recipe ID
  app.get('/getRecipebyID/:ID', async function (req, res) {
    const endpoint = "/lookup.php?i=" + req.params.ID;
    console.log("SERVER ID: ", req.params.ID);
    console.log("URL: ", baseUrl + endpoint);
    const recipe = await fetch(baseUrl + endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    const data = await recipe.json();
    console.log(data.meals[0]);
    res.json(data.meals[0]);
  });

  // Retrieves a list of recipes from recipe
  app.get('/getRecipe/:recipe', async function (req, res) {
    const endpoint = "/search.php?s=" + req.params.recipe;
    console.log("SERVER RECIPE: ", req.params.recipe);
    const recipe = await fetch(baseUrl + endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    const data = await recipe.json();
    console.log(data.meals);
    res.json(data.meals);
  });

  // Retrieves a random recipe
  app.get('/getRandomRecipe', async function (req, res) {
    const endpoint = "/random.php"
    const recipe = await fetch(baseUrl + endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    const data = await recipe.json();
    console.log(data.meals[0]);
    res.json(data.meals[0]);
  });

  // Retrieves all categories
  app.get('/getAllCategories', async function (req, res) {
    const endpoint = "/categories.php"
    const recipe = await fetch(baseUrl + endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    const data = await recipe.json();
    console.log(data.categories);
    res.json(data.categories);
  });

  // Retrieves a list of recipes from category
  app.get('/getCategory/:category', async function (req, res) {
    const endpoint = "/filter.php?c=" + req.params.category;
    console.log("SERVER category: ", req.params.category);
    const recipe = await fetch(baseUrl + endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    const data = await recipe.json();
    console.log(data.meals);
    res.json(data.meals);
  });

  // Retrieves a list of recipes from cuisine
  app.get('/getCuisine/:cuisine', async function (req, res) {
    const endpoint = "/filter.php?a=" + req.params.cuisine;
    console.log("SERVER cuisine: ", req.params.cuisine);
    const recipe = await fetch(baseUrl + endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    const data = await recipe.json();
    console.log(data.meals);
    res.json(data.meals);
  });

  // Retrieves a list of recipes from first letter
  app.get('/getFirstLetter/:letter', async function (req, res) {
    const endpoint = "/search.php?f=" + req.params.letter;
    console.log("SERVER letter: ", req.params.letter);
    const recipe = await fetch(baseUrl + endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    const data = await recipe.json();
    console.log(data.meals);
    res.json(data.meals);
  });

  // Post favorites to user 
  app.post('/api/recipes', requireLogin, async (req, res) => {
    const { ID, title, thumbnail } = req.body;
    console.log("SAVED RECIPE: ", req.body);
    req.user.favorites.push({
      ID: ID,
      title: title,
      thumbnail: thumbnail
    });
    const user = await req.user.save();
    res.send(user);
  })

  // Retrieves favorites from user 
  app.get('/api/recipes', requireLogin, async (req, res) => {
    const recipes = await User.favorites;

    res.send(recipes);
  })
}