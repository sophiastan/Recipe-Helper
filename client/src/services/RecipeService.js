class RecipeService {

  // Retrieves a list of recipes from ingredients 
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

  // Retrieves a list of recipes from ingredients 
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
}

export default RecipeService;