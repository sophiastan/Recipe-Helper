import { FETCH_RECIPES } from '../actions/types';

export default function fetchRecipes(state = [], action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.payload
    default:
        return state;
  }
}