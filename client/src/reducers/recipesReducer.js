import { FETCH_RECIPES, DELETE_RECIPE } from '../actions/types';

export default function recipes(state = [], action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.payload
    case DELETE_RECIPE:
      return action.payload
    default:
        return state;
  }
}