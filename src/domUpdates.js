import {
  filterByTag,
  getRecipeByName,
  getIngredientNames,
  getIngredientPriceSum,
  getRecipeInstructions,
} from './recipes.js';

import {randomizeUser , addRecipe, removeRecipe} from './users.js';
import recipeData from './data/recipes.js';
import ingredientsData from './data/ingredients.js';
import usersData from './data/users.js';

// Query Selectors
const allTags = document.querySelectorAll('.tag-button');
const displayedRecipesSection = document.querySelector('.recipes-container');
const tagBar = document.querySelector('.tagbar');
const topNav = document.querySelector('.topnav');
const header = document.querySelector('header');
const fullPageRecipe = document.querySelector('.recipe');
const recipeTitleSection = document.querySelector('.recipe-title');
const recipeTitle = document.querySelector('.recipe-title-h1');
const tagsParagraph = document.querySelector('.tags');
const recipeImage = document.querySelector('.recipe-picture');
const priceParagraph = document.querySelector('.price-text');
const recipeIngredientsSection = document.querySelector('.recipe-ingredients');
const recipeInstructionsSection = document.querySelector('.recipe-instructions');
const xBtn = document.querySelector('.x-button');
const searchInput = document.querySelector('.search-input');
const myRecipesBtn = document.querySelector('.my-recipes')
// const homeBtn = document.querySelector('.fa-house')
const homeView = document.querySelector('.home-view')
let isUserRecipesView = false;
let mySavedRecipes;
const saveBtn = document.querySelector('.save-button');
const savedBtn = document.querySelector('.save-button-active');
var currentUser = {};

// Event Listeners
allTags.forEach((tag) => {
  tag.addEventListener('click', returnListByTag);
});

searchInput.addEventListener('keypress', returnSearchedRecipe);

window.addEventListener('load', function() {
  generateRecipes(recipeData);
  currentUser = randomizeUser(usersData);
});


header.addEventListener('click', function(event) {
  closeRecipePage(event);
})

fullPageRecipe.addEventListener('click', function(event) {
  toggleSaveButton(event);
})
allTags.forEach((tag) => {
  tag.addEventListener('click', returnListByTag);
});
searchInput.addEventListener('keypress', returnSearchedRecipe);
window.addEventListener('load', generateRecipes(recipeData));
myRecipesBtn.addEventListener('click', viewMyRecipes)
homeView.addEventListener('click', goHome)
// saveBtn.addEventListener('click' saveRecipe)
displayedRecipesSection.addEventListener('click', function (event) {
  displayRecipe(event);
});

// Functions
function saveRecipe() {

}

function goHome(){
  isUserRecipesView = false
  console.log("is user recipe view", isUserRecipesView);
  generateRecipes(recipeData)
}

function viewMyRecipes(userRecipes) {
  // generateRecipes(userRecipes)
  displayedRecipesSection.innerHTML = ''
  isUserRecipesView = true
  console.log("is user recipe view", isUserRecipesView);
}

function returnSearchedRecipe(event) {
  if (event.key === 'Enter') {
    const searchText = event.target.value;

    if (isUserRecipesView) {
      console.log("searching user's saved recipes");
      const result = (getRecipeByName(mySavedRecipes, searchText));
      if (result) {
        generateRecipes(result);
      }
    } else {
      console.log("searching all recipes");
      const result = (getRecipeByName(recipeData, searchText));
      if (result) {
        generateRecipes(result);
      }
    }
  }
}


function returnListByTag(event){
  const buttonID = event.target.id;

  if (isUserRecipesView) {
    if (buttonID === 'all'){
        const filteredRecipes = mySavedRecipes;
        generateRecipes(filteredRecipes);
    } else { 
        const filteredRecipes =  filterByTag(mySavedRecipes, buttonID);
        generateRecipes(filteredRecipes);
      }
  } else {
      if (buttonID === 'all'){
          const filteredRecipes = recipeData;
          generateRecipes(filteredRecipes);
      } else { 
          const filteredRecipes =  filterByTag(recipeData, buttonID);
          generateRecipes(filteredRecipes);
      }
  }

  // if (buttonID === 'all'){
  //   if (isUserRecipesView) {
  //     const filteredRecipes = mySavedRecipes;
  //     generateRecipes(filteredRecipes);
  //   } else {
  //     const filteredRecipes = recipeData;
  //     generateRecipes(filteredRecipes);
  //   }
  // } else {
  //   if (isUserRecipesView) {
  //     const filteredRecipes =  filterByTag(mySavedRecipes, buttonID);
  //     generateRecipes(filteredRecipes);
  //   } else {
  //     const filteredRecipes =  filterByTag(recipeData, buttonID);
  //     generateRecipes(filteredRecipes);
  //   }
}

function generateRecipes(recipes) {
  displayedRecipesSection.innerHTML = '';

  recipes.forEach((recipe) => {
    displayedRecipesSection.innerHTML += `
    <div class="recipe-item">
      <img class="recipe-image" src="${recipe.image}" alt="Recipe Photo">
      <p>${recipe.name}</p>
    </div>
    `;
  });
}

function displayRecipe(event) {
  if (event.target.closest('div').classList.contains('recipe-item')) {
    header.style.backgroundImage = 'none';
    header.style.backgroundColor = '#e7e5e6';
    header.style.height = '70px';
    show(xBtn);
    show(fullPageRecipe);
    hide(topNav);
    hide(tagBar);
    hide(displayedRecipesSection);

    const recipe = recipeData.find(
      (recipe) =>
        recipe.name ===
        event.target.closest('div').querySelector('p').textContent
    );

    const price = getIngredientPriceSum(recipe, ingredientsData) / 100;

    if (currentUser.recipesToCook.some(savedRecipe => savedRecipe.id === recipe.id)) {
      hide(saveBtn);
      show(savedBtn);
    }
    
    generateRecipeTitle(recipe.name);
    generateRecipeTags(recipe.tags);
    generateRecipeImage(recipe.image);
    generateRecipePrice(price);
    generateRecipeIngredients(recipe.ingredients);
    generateRecipeInstructions(recipe.instructions);
		
  }
}

function generateRecipeTitle(title) {
  recipeTitle.innerText = title;
}

function generateRecipeTags(tags) {
  tagsParagraph.innerHTML = `<span class="orange-text">Tags:</span> ${tags.join(
    ', '
  )}`;
}

function generateRecipeImage(image) {
  recipeImage.innerHTML = `<img src="${image}" alt="Recipe Image">`;
}

function generateRecipePrice(price) {
  recipeIngredientsSection.innerHTML = '';
  recipeIngredientsSection.innerHTML = `<h3>Recipe Cost</h3><p class="price-text">$${price.toFixed(2)}</p>`
}

function generateRecipeIngredients(ingredients) {
  recipeIngredientsSection.innerHTML += '<h3>Ingredients</h3>'
  ingredients.forEach(ingredient => recipeIngredientsSection.innerHTML += `<p>${ingredient.quantity.amount} ${ingredient.quantity.unit} ${ingredientsData.find(iteration => iteration.id === ingredient.id).name}</p>`)
}

function generateRecipeInstructions(instructions) {
  recipeInstructionsSection.innerHTML = ''
  instructions.forEach(instruction => recipeInstructionsSection.innerHTML += `<h3>Step ${instruction.number}</h3><p>${instruction.instruction}</p>`)
}

function toggleSaveButton(event) {
  const recipe = recipeData.find(
    (recipe) =>
      recipe.name ===
      event.target.closest('div').querySelector('h1').textContent
  );

  if (event.target.classList.contains('save-button')) {
    hide(saveBtn);
    show(savedBtn);
		addRecipe(recipe, currentUser);
  } else {
    show(saveBtn);
    hide(savedBtn);
    removeRecipe(currentUser, recipe);
  }
}

function closeRecipePage(event) {
  if (event.target.classList.contains('x-button')) {
    header.style.backgroundImage = "url('images/whats-cooking-banner.jpg')";
    header.style.backgroundColor = '';
    header.style.height = '250px';
    show(topNav);
    show(tagBar);
    show(displayedRecipesSection);
    show(saveBtn);
    hide(fullPageRecipe);
    hide(xBtn);
    hide(savedBtn);
  }
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}


export { returnListByTag, generateRecipes, returnSearchedRecipe, viewHome, viewMyRecipes };
