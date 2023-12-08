/*As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)

As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)
 */
import {
  filterByTag,
  getRecipeByName,
  getIngredientNames,
  getIngredientPriceSum,
  getRecipeInstructions,
} from './recipes.js';

import recipeData  from "./data/recipes.js";

// Queries
const tagBar = document.querySelector('.tagbar')
const allTags = document.querySelectorAll('.tag-button');
const displayedRecipesSection = document.querySelector('.grid-container');
const searchInput = document.querySelector('.search-input');
const topNav = document.querySelector('.topnav')
const header = document.querySelector('header');

// Event Listeners
allTags.forEach(tag => {
  tag.addEventListener('click', returnListByTag)
})
searchInput.addEventListener('keypress', returnSearchedRecipe)
window.addEventListener('load', generateRecipes(recipeData))

function returnSearchedRecipe(event) {
  if (event.key === 'Enter') {
    const searchText = event.target.value
    const result = (getRecipeByName(recipeData, searchText))

    if (result) {
      generateRecipes(result)
    }
  }
}

function returnListByTag(event){
  const buttonID = event.target.id;

  if (buttonID === 'all'){
    const filteredRecipes = recipeData
    generateRecipes(filteredRecipes)
  } else {
    const filteredRecipes =  filterByTag(recipeData, buttonID);
    generateRecipes(filteredRecipes)
  }
}

function generateRecipes(recipes) {
  displayedRecipesSection.innerHTML = "";

  recipes.forEach(recipe => {
    displayedRecipesSection.innerHTML += `
    <div class="grid-item">
      <img class="recipe-image" src="${recipe.image}" alt="Recipe Photo">
      <p>${recipe.name}</p>
    </div>
    `
  })
}

function hide(element) {
  element.classList.add('hidden')
}

function show(element) {
  element.classList.remove('hidden')
}

export {
    returnListByTag,
    returnSearchedRecipe,
    hide,
    show
}