import { expect } from 'chai';
const { getIngredientNames , getIngredientPriceSum , getRecipeInstructions} = require('../src/recipes2');


describe('Recipe 2', () => {
	let testIngredientData;
	let testRecipe;
	beforeEach(function () {
		testIngredientData = [   
		{
      "id": 20081,
      "name": "wheat flour",
      "estimatedCostInCents": 142
    },
    {
      "id": 18372,
      "name": "bicarbonate of soda",
      "estimatedCostInCents": 582
    },
    {
      "id": 1123,
      "name": "eggs",
      "estimatedCostInCents": 472
    }]

		testRecipe = {
			"id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients":[
				{
          "id": 20081,  
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        }
			],
			"instructions": [
        {
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        },
        {
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          "number": 3
        }
			],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
		}	
	});

  it('getIngredientNames Should be a function', () => {
    expect(getIngredientNames).to.be.a('function');
  });
  
	it('getIngredientPriceSum Should be a function', () => {
    expect(getIngredientPriceSum).to.be.a('function');
  });
  
	it('getRecipeInstructions Should be a function', () => {
    expect(getRecipeInstructions).to.be.a('function');
  });

	it('Should return an error message if any function is given a undefined recipe', () => {
		let test1 =  getIngredientNames(undefined);
		let test2 =  getIngredientPriceSum(undefined);
		let test3 =  getRecipeInstructions(undefined);
    expect(test1).to.equal('Not a valid recipe');
		expect(test2).to.equal('Not a valid recipe');
		expect(test3).to.equal('Not a valid recipe');
  });

	it('Should be able to get Names of Ingredients for a valid recipe name', () => {
		const recipeName = 'Loaded Chocolate Chip Pudding Cookie Cups';
		const expectedIngredients = ['wheat flour', 'bicarbonate of soda', 'eggs'];
		const result = getIngredientNames(testRecipe, testIngredientData); 
    	expect(result).to.deep.equal(expectedIngredients);
  });

	it('Should be able to get the Sum of the prices', () => {
		let finalSum = getIngredientPriceSum(testRecipe,testIngredientData);
    expect(finalSum).to.equal(976);
  });

	it('Should be able to get the directions of the recipe', () => {
		let instructionsArray = getRecipeInstructions(testRecipe);
		let finalInstructions = testRecipe.instructions; 
    expect(instructionsArray).to.deep.equal(finalInstructions);
  });
})