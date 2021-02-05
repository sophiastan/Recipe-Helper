class RecipeService {

  // Retrieves a list of recipes from ingredient 
  getIngredient = async (ingredient) => {
    if (ingredient) {
      const url = `http://localhost:5000/getIngredient/${ingredient}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
    return null;
  }

  // Retrieves recipe details from recipe ID
  getRecipeByID = async (ID) => {
    if (ID) {
      const url = `http://localhost:5000/getRecipebyID/${ID}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
    return null;
  }

  // Retrieves a list of recipes from recipe
  getRecipe = async (recipe) => {
    if (recipe) {
      const url = `http://localhost:5000/getRecipe/${recipe}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
    return null;
  } 
  
  // Retrieves a random recipe
  getRandomRecipe = async () => {
    const url = `http://localhost:5000/getRandomRecipe`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } 

  // Retrieves all categories
  getAllCategories = async () => {
    const url = `http://localhost:5000/getAllCategories`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } 

  // Retrieves a list of recipes from category
  getCategory = async (category) => {
    if (category) {
      const url = `http://localhost:5000/getCategory/${category}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
    return null;
  } 

  // Retrieves a list of recipes from area
  getCuisine = async (cuisine) => {
    if (cuisine) {
      const url = `http://localhost:5000/getCuisine/${cuisine}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
    return null;
  } 
}

export default RecipeService;