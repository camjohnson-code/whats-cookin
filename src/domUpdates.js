import {
  filterByTag,
  getRecipeByName,
  getIngredientNames,
  getIngredientPriceSum,
  getRecipeInstructions,
} from './recipes.js';

import { getApiInfo, saveRecipe } from './apiCalls.js';
import { addRecipe, removeRecipe } from './users.js';

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
const recipeInstructionsSection = document.querySelector(
  '.recipe-instructions'
);
const xBtn = document.querySelector('.x-button');
const searchInput = document.querySelector('.search-input');
const myRecipesBtn = document.querySelector('.my-recipes');
const homeView = document.querySelector('.home-view');
const saveBtn = document.querySelector('.save-button');
const savedBtn = document.querySelector('.save-button-active');
const sideBar = document.querySelector('.sidenav');
const showNavBtn = document.querySelector('.show-button');
const hideNavBtn = document.querySelector('.hide-button');
const groceryListBtn = document.querySelector('.my-grocery-list');
const savePartyBtn = document.querySelector('.add-to-list');
const savedPartyBtn = document.querySelector('.add-to-list-active');
const displayedPartyRecipesSection = document.querySelector(
  '.party-recipes-container'
);
const partyRecipesImages = document.querySelector('.party-recipes-images');
const partyIngredientsList = document.querySelector('.party-ingredients-list');
const partyTotalPrice = document.querySelector('.party-total-price');
const userName = document.querySelector('.user-name');
let isUserRecipesView = false;
let currentUser;
let ingredientsData;
let recipeData;
let partyRecipes = [];
let totalPrice = 0;
let allIngredients = [];

function addPartyRecipe(recipe) {
  partyRecipes.push(recipe);
}

function removePartyRecipe(targetRecipe) {
  const index = partyRecipes.findIndex(
    (recipe) => recipe.id === targetRecipe.id
  );
  partyRecipes.splice(index, 1);
}

function toggleAddPartyBtn(event) {
  const partyRecipe = recipeData.find(
    (recipe) =>
      recipe.name ===
      event.target.closest('div').querySelector('h1').textContent
  );

  if (
    event.target === 'button.add-to-list' ||
    (event.target.closest('button').classList.contains('add-to-list') &&
      savedPartyBtn.classList.contains('hidden'))
  ) {
    hide(savePartyBtn);
    show(savedPartyBtn);
    addPartyRecipe(partyRecipe);
  } else if (
    event.target === 'button.add-to-list-active' ||
    event.target.closest('button').classList.contains('add-to-list-active')
  ) {
    show(savePartyBtn);
    hide(savedPartyBtn);
    removePartyRecipe(partyRecipe);
  }
}

function assignCurrentUser() {
  getApiInfo('users').then((user) => {
    currentUser = user;
    userName.innerText = `Hello, ${user.name.split(' ')[0]}`;
  });
}

function assignIngredients() {
  getApiInfo('ingredients').then((ingredients) => {
    ingredientsData = ingredients.ingredients;
  });
}

function assignRecipes() {
  getApiInfo('recipes').then((recipes) => {
    recipeData = recipes.recipes;
    generateRecipes(recipeData);
  });
}

// Event Listeners
sideBar.addEventListener('click', function (event) {
  closeRecipePage(event);
});

allTags.forEach((tag) => {
  tag.addEventListener('click', returnListByTag);
});

searchInput.addEventListener('keyup', returnSearchedRecipe);

window.addEventListener('load', function () {
  assignCurrentUser();
  assignIngredients();
  assignRecipes();
});

header.addEventListener('click', function (event) {
  closeRecipePage(event);
});

fullPageRecipe.addEventListener('click', function (event) {
  toggleSaveButton(event);
  toggleAddPartyBtn(event);
});

allTags.forEach((tag) => {
  tag.addEventListener('click', returnListByTag);
});

displayedRecipesSection.addEventListener('click', function (event) {
  displayRecipe(event);
});

searchInput.addEventListener('keypress', returnSearchedRecipe);

myRecipesBtn.addEventListener('click', viewMyRecipes);

homeView.addEventListener('click', goHome);

showNavBtn.addEventListener('click', showNav);

hideNavBtn.addEventListener('click', hideNav);

groceryListBtn.addEventListener('click', function (event) {
  allIngredients = [];
  totalPrice = 0;
  makeGroceryList();
  generatePartyRecipes(partyRecipes);
});

// Functions
function goHome() {
  isUserRecipesView = false;
  generateRecipes(recipeData);
  hideNav();
  hide(displayedPartyRecipesSection);
}

function viewMyRecipes(userRecipes) {
  displayedRecipesSection.innerHTML = '';
  generateRecipes(currentUser.recipesToCook);
  isUserRecipesView = true;
  hideNav();
  hide(displayedPartyRecipesSection);
}

searchInput.addEventListener('input', returnSearchedRecipe);

function returnSearchedRecipe(event) {
  const searchText = event.target.value.toLowerCase().trim();

  let filteredRecipes;
  if (isUserRecipesView) {
    filteredRecipes = currentUser.recipesToCook.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText)
    );
  } else {
    filteredRecipes = recipeData.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText)
    );
  }

  generateRecipes(filteredRecipes);
}

function returnListByTag(event) {
  const buttonID = event.target.id;
  const listItems = document.querySelectorAll('.tagbar ul li');

  listItems.forEach(function (li) {
    const tagButton = li.querySelector('button');

    if (tagButton && tagButton.classList.contains('selected'))
      tagButton.classList.remove('selected');
    if (tagButton && tagButton.id === buttonID)
      tagButton.classList.add('selected');
  });

  if (isUserRecipesView) {
    if (buttonID === 'all') {
      const filteredRecipes = currentUser.recipesToCook;
      generateRecipes(filteredRecipes);
    } else {
      const filteredRecipes = filterByTag(currentUser.recipesToCook, buttonID);
      generateRecipes(filteredRecipes);
    }
  } else {
    if (buttonID === 'all') {
      const filteredRecipes = recipeData;
      generateRecipes(filteredRecipes);
    } else {
      const filteredRecipes = filterByTag(recipeData, buttonID);
      generateRecipes(filteredRecipes);
    }
  }
}

function generateRecipes(recipes) {
  hide(displayedPartyRecipesSection);
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

function generatePartyRecipes(partyRecipes) {
  hide(displayedRecipesSection);
  show(displayedPartyRecipesSection);

  header.style.backgroundImage = 'none';
  header.style.backgroundColor = '#e7e5e6';
  header.style.height = '70px';

  partyIngredientsList.innerHTML = '';
  partyRecipesImages.innerHTML = '';
  partyTotalPrice.innerHTML = '';

  hide(topNav);
  hide(tagBar);
  hide(fullPageRecipe);
  hide(xBtn);
  hide(savedBtn);
  hideNav();

  allIngredients.forEach((ingredient) => {
    partyIngredientsList.innerHTML += `<p>${ingredient.quantity.amount} ${
      ingredient.quantity.unit
    } ${
      ingredientsData.find((iteration) => iteration.id === ingredient.id).name
    }</p>`;
  });

  partyRecipes.forEach((recipe) => {
    const partyRecipesImagesContainer = document.createElement('div');

    partyRecipesImagesContainer.classList.add('recipe-item');

    partyRecipesImagesContainer.innerHTML = `
      <img class="recipe-image" src="${recipe.image}" alt="Recipe Photo">
      <p>${recipe.name}</p>
    `;

    partyRecipesImages.appendChild(partyRecipesImagesContainer);
  });
  partyTotalPrice.innerHTML = `Total Cost: $${
    Math.round(totalPrice * 100) / 100
  }`;
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
    hide(displayedPartyRecipesSection);

    const recipe = recipeData.find(
      (recipe) =>
        recipe.name ===
        event.target.closest('div').querySelector('p').textContent
    );

    const price = getIngredientPriceSum(recipe, ingredientsData) / 100;

    if (
      currentUser.recipesToCook.some(
        (savedRecipe) => savedRecipe.id === recipe.id
      )
    ) {
      hide(saveBtn);
      show(savedBtn);
    } else {
      hide(savedBtn);
      show(saveBtn);
    }

    if (partyRecipes.some((partyRecipe) => partyRecipe.id === recipe.id)) {
      hide(savePartyBtn);
      show(savedPartyBtn);
    } else {
      hide(savedPartyBtn);
      show(savePartyBtn);
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
  recipeIngredientsSection.innerHTML = `<h3>Recipe Cost</h3><p class="price-text">$${price.toFixed(
    2
  )}</p>`;
}

function generateRecipeIngredients(ingredients) {
  recipeIngredientsSection.innerHTML += '<h3>Ingredients</h3>';
  ingredients.forEach(
    (ingredient) =>
      (recipeIngredientsSection.innerHTML += `<p>${
        ingredient.quantity.amount
      } ${ingredient.quantity.unit} ${
        ingredientsData.find((iteration) => iteration.id === ingredient.id).name
      }</p>`)
  );
}

function generateRecipeInstructions(instructions) {
  recipeInstructionsSection.innerHTML = '';
  instructions.forEach(
    (instruction) =>
      (recipeInstructionsSection.innerHTML += `<h3>Step ${instruction.number}</h3><p>${instruction.instruction}</p>`)
  );
}

function makeGroceryList() {
  partyRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const { id, quantity } = ingredient;

      allIngredients.push({
        id: id,
        quantity: { amount: quantity.amount, unit: quantity.unit },
        name: ingredientsData.find((item) => item.id === id).name,
      });
    });
  });

  allIngredients.forEach((ingredient) => {
    const { id, quantity } = ingredient;
    const ingredientPrice = ingredientsData.find(
      (item) => item.id === id
    ).estimatedCostInCents;

    const ingredientTotalPrice = (ingredientPrice * quantity.amount) / 100;
    totalPrice += ingredientTotalPrice;
  });
  const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
}

function toggleSaveButton(event) {
  const recipe = recipeData.find(
    (recipe) =>
      recipe.name ===
      event.target.closest('div').querySelector('h1').textContent
  );

  if (
    event.target === 'button.save-button' ||
    (event.target.closest('button').classList.contains('save-button') &&
      savedBtn.classList.contains('hidden'))
  ) {
    hide(saveBtn);
    show(savedBtn);
    saveRecipe(currentUser, recipe);
  } else if (
    event.target === 'button.save-button-active' ||
    event.target.closest('button').classList.contains('save-button-active')
  ) {
    show(saveBtn);
    hide(savedBtn);
    removeRecipe(currentUser, recipe);
  }
}

function closeRecipePage(event) {
  if (
    event.target.classList.contains('x-button') ||
    event.target.classList.contains('my-recipes') ||
    event.target.classList.contains('home-view')
  ) {
    header.style.backgroundImage = "url('images/whats-cooking-banner.jpg')";
    header.style.backgroundColor = '';
    header.style.height = '250px';
    show(topNav);
    show(tagBar);
    show(displayedRecipesSection);
    hide(displayedPartyRecipesSection);
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

function showNav() {
  document.getElementById('mainSidebar').style.width = '250px';
}
function hideNav() {
  document.getElementById('mainSidebar').style.width = '0';
}

export {
  returnListByTag,
  generateRecipes,
  returnSearchedRecipe,
  goHome,
  viewMyRecipes,
  showNav,
  hideNav,
  makeGroceryList,
};
