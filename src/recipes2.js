function getIngredientNames(recipe , ingredientsData) {
	if ((!recipe) || (!ingredientsData)) {
		return 'Not a valid recipe';
	}

	return recipe.ingredients.map(ingredient => ingredient.id).map(id => ingredientsData.find(ingredient => ingredient.id === id)).map(ingredient => ingredient.name);
}

function getIngredientPriceSum(recipe , ingredientsData) {
	if ((!recipe) || (!ingredientsData)) {
		return 'Not a valid recipe';
	}

	return recipe.ingredients.reduce((acc, cost) => acc + (
		cost.quantity.amount * ingredientsData.find(ingredient => ingredient.id === cost.id).estimatedCostInCents
	), 0);
}

function getRecipeInstructions(recipe) {
	if (!recipe) {
		return 'Not a valid recipe';
	}
	
	return recipe.instructions;
}

module.exports = {
	getIngredientNames,
	getIngredientPriceSum,
	getRecipeInstructions
}
