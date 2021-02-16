import axios from 'axios';
import { FETCH_USER, FETCH_RECIPES, DELETE_RECIPE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveRecipe = (ID, title, thumbnail, isFavorited) => async dispatch => {
  const res = await axios.post('/api/recipes', { ID, title, thumbnail, isFavorited });
  
  console.log("saveRecipe: ", res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchRecipes = () => async dispatch => {
  const res = await axios.get('/api/recipes');

  console.log("fetchRecipes: ", res.data);
  dispatch({ type: FETCH_RECIPES, payload: res.data })
}

export const deleteRecipe = (ID) => async dispatch => {
  console.log(ID);
  const res = await axios.delete(`/api/delete/${ID}`, { params: { ID: ID }});

  console.log("deleteRecipe: ", res.data);
  dispatch({ type: DELETE_RECIPE, payload: res.data })
}