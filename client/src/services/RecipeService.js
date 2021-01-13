class RecipeService {

  // Retrieves a list of recipes from ingredients 
  getIngredients = async (ingredients) => {
    if (ingredients) {
      const url = `http://localhost:5000/getIngredients/${ingredients}`;
      console.log("recipeService url: ", url);
      const res = await fetch(url);
      return await res.json();
    }
    return null;
  }

  
}

export default RecipeService;