//NOTE: Data model and non-dom manipulating logic will live in this file.
import './styles.css';
import apiCalls from './apiCalls';
import './images/turing-logo.png';
import { 
	randomizeUser,
	toggleAddToList
 } from "./users";

import {
  returnSearchedRecipe,
  returnListByTag,
  generateRecipes,
  isMyRecipeTab,
  showNav,
  hideNav,
  displayRecipes
} from './domUpdates';
