class RecipeService {

  // Retrieves a list of recipes from ingredients 
  getIngredients = async (ingredients) => {
    if (ingredients) {
      const url = `http://localhost:5000/getIngredients/${ingredients}`;
      const res = await fetch(url);
      return await res.json();
    }
    return null;
  }

  // Retrieves a list of recipes from ingredients 
  getIngredientsRecipe = async (ingredients, recipe) => {
    if (ingredients && recipe) {
      const url = `http://localhost:5000/getIngredients/${ingredients}/${recipe}`;
      console.log("recipeService url: ", url);
      const res = await fetch(url);
      return await res.json();
    }
    return null;
  }  
}

export default RecipeService;