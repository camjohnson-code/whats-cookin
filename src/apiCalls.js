import { randomizeUser } from "./users";

// Your fetch requests will live here!

export function getIngredients() {
    const ingredients = fetch ('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients').then(response => response.json().then());
    return ingredients
}

export function getUser() {
    const users = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users').then(response => response.json().then(data => randomizeUser(data.users)))
    return users
}

export function getRecipes() {
    const recipes = fetch ('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes').then(response => response.json().then());
    return recipes
}