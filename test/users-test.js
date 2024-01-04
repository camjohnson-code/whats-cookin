import { expect } from 'chai';
import {
	addRecipe,
	removeRecipe
} from "../src/users";

import {
	filterByTag,
	getRecipeByName,
} from '../src/recipes';



describe('User Functions', () => {
	let testUser;
	let testRecipe;
	let testIngredientData;
	beforeEach(function () {
		testUser = {
			"name": "Saige O'Kon",
			"id": 1,
			"recipesToCook": []
		};
		testIngredientData = [
      {
        id: 20081,
        name: 'wheat flour',
        estimatedCostInCents: 142,
      },
      {
        id: 18372,
        name: 'bicarbonate of soda',
        estimatedCostInCents: 582,
      },
      {
        id: 1123,
        name: 'eggs',
        estimatedCostInCents: 472,
      },
    ];
		testRecipe = {
      id: 595736,
      image: 'https://spoonacular.com/recipeImages/595736-556x370.jpg',
      ingredients: [
        {
          id: 20081,
          quantity: {
            amount: 1.5,
            unit: 'c',
          },
        },
        {
          id: 18372,
          quantity: {
            amount: 0.5,
            unit: 'tsp',
          },
        },
        {
          id: 1123,
          quantity: {
            amount: 1,
            unit: 'large',
          },
        },
      ],
      instructions: [
        {
          instruction:
            'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
          number: 1,
        },
        {
          instruction: 'Add egg and vanilla and mix until combined.',
          number: 2,
        },
        {
          instruction:
            'Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.',
          number: 3,
        },
      ],
      name: 'Loaded Chocolate Chip Pudding Cookie Cups',
      tags: [
        'antipasti',
        'starter',
        'snack',
        'appetizer',
        'antipasto',
        "hor d'oeuvre",
      ],
    };
	});
	it('should add a recipe to a User\'s recipesToCook', () => {
		addRecipe(testRecipe,testUser);
		expect(testUser.recipesToCook.length).to.deep.equal(1);
		expect(testUser.recipesToCook[0]).to.deep.equal(testRecipe);
		})
	
	it('should be able to remove a recipe from a User\'s recipesToCook', () => {
		addRecipe(testRecipe,testUser);
		removeRecipe(testUser,testRecipe);
		expect(testUser.recipesToCook.length).to.deep.equal(0)
	});
	it('filterbyTag should test if the User\'s recipes can be filtered by tag', () => {
		addRecipe(testRecipe,testUser);
		let result = filterByTag(testUser.recipesToCook,'antipasti');
		expect(result[0]).to.deep.equal(testRecipe);
	});
	it('fitlerByTag should return nothing if nothing matches the tag provided', () => {
		addRecipe(testRecipe,testUser);
		let result = filterByTag(testUser.recipesToCook,'desert');
		expect(result).to.deep.equal([]);
	});
	it('getRecipeByName should return recipes if they match the name provided', () => {
		addRecipe(testRecipe,testUser);
		let result = getRecipeByName(testUser.recipesToCook,'Cookie');
		expect(result[0]).to.deep.equal(testRecipe);
	});
	it('getRecipeByName should return no recipes if they do not match the name provided', () => {
		addRecipe(testRecipe,testUser);
		let result = getRecipeByName(testUser.recipesToCook,'waffles');
		expect(result).to.deep.equal([]);
	});

})