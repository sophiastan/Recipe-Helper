const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// Main App
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const baseUrl = "https://www.themealdb.com/api/json/v1/1";

app.get('/getIngredient/:ingredient', async function (req, res) {
  const endpoint = "/filter.php?i=" + req.params.ingredient;
  console.log("SERVER INGREDIENT: ", req.params.ingredient);
  console.log("URL: ", baseUrl + endpoint);
  const ingredients = await fetch(baseUrl + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });

  const data = await ingredients.json();
  console.log(data.meals);
  res.json(data.meals);
});

app.get('/getRecipebyID/:ID', async function (req, res) {
  const endpoint = "/lookup.php?i=" + req.params.ID;
  console.log("SERVER ID: ", req.params.ID);
  console.log("URL: ", baseUrl + endpoint);
  const ingredients = await fetch(baseUrl + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });

  const data = await ingredients.json();
  console.log(data.meals[0]);
  res.json(data.meals[0]);
});

app.get('/getRecipe/:recipe', async function (req, res) {
  const endpoint = "/search.php?s=" + req.params.recipe;
  console.log("SERVER RECIPE: ", req.params.recipe);
  const ingredients = await fetch(baseUrl + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });

  const data = await ingredients.json();
  console.log(data.meals);
  res.json(data.meals);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})