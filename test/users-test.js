import { expect } from 'chai';
import { 
	randomizeUser,
 } from "../src/users";

 import {
  filterByTag,
  getRecipeByName,
  getIngredientNames,
  getIngredientPriceSum,
  getRecipeInstructions,
} from '../src/recipes';



describe('randomizeUser ', () => {
	let testUser;
	let testRecipes;
	beforeEach(function (){
		testUser ={
      "name": "Saige O'Kon",
      "id": 1,
      "recipesToCook": []
    };

	});
	it('should be a function', () => {
		// expect(toggleAddToList).to.
	});
	it('should add a recipe to a User\'s recipesToCook', () => {

	});
	it('should do something', () => {

	});
	it('should test if the User\'s recipes can be filtered by tag', () => {
		//use the tag bar in the live version, use the filter function locally here

	});
	it('should test if the User\'s recipes can be filtered by a search', () => {
		//use searchBar in the live version, use local instance of search function here

	});

})