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

const baseUrl = "http://www.recipepuppy.com/api";

app.get('/getIngredients/:ingredients', async function (req, res) {
  const endpoint = "/?i=" + req.params.ingredients + "&oi=1";
  console.log("ONLY INGREDIENTS")
  console.log("SERVER INGREDIENTS: ", req.params.ingredients);
  const ingredients = await fetch(baseUrl + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });

  const data = await ingredients.json();
  console.log(data);
  res.json(data);
});

app.get('/getIngredients/:ingredients/:recipe', async function (req, res) {
  const endpoint = "/?i=" + req.params.ingredients + "&q=" + req.params.recipe + "&oi=1";
  console.log("INGREDIENTS AND RECIPE")
  console.log("SERVER INGREDIENTS: ", req.params.ingredients);
  console.log("SERVER RECIPE: ", req.params.recipe);
  const ingredients = await fetch(baseUrl + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });

  const data = await ingredients.json();
  console.log(data);
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})