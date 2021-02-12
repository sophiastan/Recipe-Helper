import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveRecipe = (ID, title, thumbnail) => async dispatch => {
  const res = await axios.post('/api/recipes', { ID, title, thumbnail });
  
  console.log("saveRecipe: ", res);
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchRecipes = () => async dispatch => {
  const res = await axios.get('/api/recipes');

  console.log("fetchRecipe: ", res);
  dispatch({ type: FETCH_USER, payload: res.data })
}