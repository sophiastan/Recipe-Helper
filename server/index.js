const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

// Main App
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const baseUrl = "http://www.recipepuppy.com/api";

app.get('/getIngredients/:ingredients', async function (req, res) {
  const endpoint = "/?i=" + req.params.ingredients
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})