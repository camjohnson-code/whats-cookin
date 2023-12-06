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
var allTags = document.querySelectorAll('.tag-button');
let displayedRecipesSection = document.querySelector('.grid-container')

// eventListener
// var displayedRecipes = [];//on load, hold all recipe information in webpage
// //when we filter by a tag, replace the contents with new filtered recipes

allTags.forEach(tag => {
  tag.addEventListener('click', returnListByTag)
})

function returnListByTag(event){
  const buttonID = event.target.id;
  console.log(buttonID);

  if (buttonID === 'all'){
    const filteredRecipes = recipeData
    generateRecipes(filteredRecipes)
    console.log(filteredRecipes);
  } else {
    const filteredRecipes =  filterByTag(recipeData, buttonID);
    generateRecipes(filteredRecipes)
    console.log(filteredRecipes);
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

// function displayRecipes() {
//   recipeData.forEach((recipe) => {
//     let recipeBlock = document.createElement('div');

//     recipeBlock.innerHTML = `
//       <img src="${recipe.image}" alt="Recipe Photo">
//       <p>${recipe.name}</p>
//     `;

//     recipeBlock.classList.add('grid-item');
//     recipesSection.appendChild(recipeBlock);
//   });
// }

function testFunction () {
  console.log("test")
}



export {
    returnListByTag,
    testFunction,
}