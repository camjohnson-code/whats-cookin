//NOTE: Data model and non-dom manipulating logic will live in this file.
import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import ingredientsData from './data/ingredients';
import usersData  from "./data/users";
import { 
	randomizeUser,
	toggleAddToList
 } from "./users";

// Below are examples of how you can import functions from either the recipes or domUpdates files.
// import { findRecipeIngredients  } from './recipes';

import {
  returnSearchedRecipe,
  returnListByTag,
  generateRecipes,
  isMyRecipeTab
} from './domUpdates';

import { displayRecipes } from './domUpdates'