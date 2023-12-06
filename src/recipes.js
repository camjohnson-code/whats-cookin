function filterByTag(recipes, tag) {
  return recipes.filter((recipe) => recipe.tags.includes(tag));
}

function getRecipeByName(recipes, name) {
	const lowerCaseName = name.toLowerCase().trim();
	return recipes.find(recipe =>
	  recipe.name.toLowerCase().includes(lowerCaseName)
	);
  }

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

export {
  filterByTag,
  getRecipeByName,
  getIngredientNames,
  getIngredientPriceSum,
  getRecipeInstructions
};
