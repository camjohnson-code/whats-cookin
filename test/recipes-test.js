import { expect } from 'chai';
import { filterByTag, getRecipeByName } from '../src/recipes';

describe('filterByTag function ', () => {
  it('Should return a filtered list based on the tag', () => {
    const recipeData = 
    [
      {
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": "",
        "name": "Dirty Steve's Original Wing Sauce",
        "tags": [
          "sauce"
        ]
      },
      {
        "id": 741603,
        "image": "https://spoonacular.com/recipeImages/741603-556x370.jpeg",
        "ingredients": "",
        "name": "Elvis Pancakes",
        "tags": [
          "side dish"
        ]
      }
    ]
    
    const result = filterByTag(recipeData, "sauce");

    expect(result).to.deep.equal(      
      [{
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": "",
      "name": "Dirty Steve's Original Wing Sauce",
      "tags": [
        "sauce"
      ]
    }])
  });
})

describe('getRecipeByName function ', () => {
  it("should return a recipe based on given name", () => {
    const recipeData = 
    [
      {
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": "",
        "name": "Dirty Steve's Original Wing Sauce",
        "tags": [
          "sauce"
        ]
      },
      {
        "id": 741603,
        "image": "https://spoonacular.com/recipeImages/741603-556x370.jpeg",
        "ingredients": "",
        "name": "Elvis Pancakes",
        "tags": [
          "side dish"
        ]
      }
    ]

    const result = getRecipeByName(recipeData, "elvis pancakes");

    expect(result).to.deep.equal({
      "id": 741603,
      "image": "https://spoonacular.com/recipeImages/741603-556x370.jpeg",
      "ingredients": "",
      "name": "Elvis Pancakes",
      "tags": [
        "side dish"
      ]
    })
  })

  it("should not matter if name is capitalized or lowercase", () => {
    const recipeData = 
    [
      {
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": "",
        "name": "Dirty Steve's Original Wing Sauce",
        "tags": [
          "sauce"
        ]
      },
      {
        "id": 741603,
        "image": "https://spoonacular.com/recipeImages/741603-556x370.jpeg",
        "ingredients": "",
        "name": "Elvis Pancakes",
        "tags": [
          "side dish"
        ]
      }
    ]

    const result = getRecipeByName(recipeData, "ELVIS pAncAkes");

    expect(result).to.deep.equal({
      "id": 741603,
      "image": "https://spoonacular.com/recipeImages/741603-556x370.jpeg",
      "ingredients": "",
      "name": "Elvis Pancakes",
      "tags": [
        "side dish"
      ]
    })
  })
})


