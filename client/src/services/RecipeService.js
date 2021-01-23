class RecipeService {

  // Retrieves a list of recipes from ingredients 
  getIngredients = async (ingredients) => {
    if (ingredients) {
      const url = `http://localhost:5000/getIngredients/${ingredients}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
    return null;
  }

  // Retrieves a list of recipes from ingredients 
  getIngredientsRecipe = async (ingredients, recipe) => {
    if (ingredients && recipe) {
      const url = `http://localhost:5000/getIngredients/${ingredients}/${recipe}`;
      console.log("recipeService url: ", url);
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
    return null;
  }  
}

export default RecipeService;