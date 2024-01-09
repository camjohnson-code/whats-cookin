import { randomizeUser, addRecipe } from './users';

function getApiInfo(type) {
  let apiURL = 'http://localhost:3001/api/v1/';
  apiURL += type;
  let apiResponse;
  if (type === 'users') {
    return fetch(apiURL).then((response) =>
      response.json().then((data) => randomizeUser(data.users))
    );
  } else {
    return fetch(apiURL).then((response) => response.json());
  }
}

function saveRecipe(user, recipe) {
  return fetch('http://localhost:3001/api/v1/usersRecipes', {
    method: 'POST',
    body: JSON.stringify({
      userID: user.id,
      recipeID: recipe.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Failed to add recipe to cook. Status: ${response.status}`);
      return response.json();
    })
    .then((users) => addRecipe(recipe, user))
    .catch((error) => console.log('Error adding recipe to cook'));
}

export { getApiInfo, saveRecipe };
